package com.example.world.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.world.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    
    User findByEmail(String email);

    User findByUsername(String username);


}
