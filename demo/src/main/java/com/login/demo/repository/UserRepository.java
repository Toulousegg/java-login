package com.login.demo.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.login.demo.entity.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    // Buscar usuario para login y JWT
    Optional<User> findByEmail(String email);



    // Validaciones al registrar
    boolean existsByEmail(String email);



    boolean existsByCpf(String cpf);


}