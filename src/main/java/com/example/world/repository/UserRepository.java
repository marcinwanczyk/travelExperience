package com.example.world.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.world.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByUsername(String username);
}
