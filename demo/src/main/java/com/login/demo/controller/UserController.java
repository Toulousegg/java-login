package com.login.demo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.demo.dto.ChangePasswordRequest;
import com.login.demo.service.UserService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {



    private final UserService userService;




    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {


        userService.changePassword(
                request,
                authentication
        );


        return ResponseEntity.ok(
                "Contraseña actualizada correctamente"
        );

    }

}