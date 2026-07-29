package com.login.demo.dto;


import com.login.demo.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {


    private String name;


    private String email;


    private String password;


    private String cpf;


    private Role role;


}