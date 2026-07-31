package com.login.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.login.demo.config.JwtService;
import com.login.demo.dto.AuthResponse;
import com.login.demo.dto.ForgotPasswordRequest;
import com.login.demo.dto.LoginRequest;
import com.login.demo.dto.RegisterRequest;
import com.login.demo.entity.Role;
import com.login.demo.entity.User;
import com.login.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is used");
        }

        if (userRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("CPF is used");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .cpf(request.getCpf())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();

        user = userRepository.save(user);

        String token = jwtService.createToken(user.getId());

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not existing"));

        String token = jwtService.createToken(user.getId());

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole())
                .build();
    }

    public String forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                throw new RuntimeException("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        return "Password changed successfully";
        }

}