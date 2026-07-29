package com.login.demo.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.login.demo.entity.Role;
import com.login.demo.entity.User;
import com.login.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;



@Configuration
@RequiredArgsConstructor
public class DataSeeder {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    @Bean
    public CommandLineRunner initDatabase() {

        return args -> {


            if (userRepository.findByEmail("admin@test.com").isEmpty()) {


                User admin = User.builder()

                        .name("Administrador")

                        .email("admin@test.com")

                        .cpf("12345678900")

                        .password(
                                passwordEncoder.encode("admin123")
                        )

                        .role(Role.ADMIN)

                        .build();


                userRepository.save(admin);


                System.out.println(
                        "Administrador creado:"
                        + " admin@test.com / admin123"
                );
            }

        };

    }

}