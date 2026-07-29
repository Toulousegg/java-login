package com.login.demo.entity;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;



@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "cpf")
        }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String name;



    @Column(nullable = false, unique = true)
    private String email;



    @Column(nullable = false, unique = true)
    private String cpf;



    @Column(nullable = false)
    private String password;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;



    // Spring Security usa esto para saber los permisos
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + role.name()
                )
        );
    }



    // Spring Security usa username como identificador
    @Override
    public String getUsername() {

        return email;
    }



    @Override
    public boolean isAccountNonExpired() {

        return true;
    }



    @Override
    public boolean isAccountNonLocked() {

        return true;
    }



    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }



    @Override
    public boolean isEnabled() {

        return true;
    }

}