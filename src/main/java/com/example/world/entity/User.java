package com.example.world.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private Set<String> visitedCountries = new HashSet<>();

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getVisitedCountries() {
        return visitedCountries;
    }

    public void setVisitedCountries(Set<String> visitedCountries) {
        this.visitedCountries = visitedCountries;
    }

    public void addVisitedCountry(String country) {
        this.visitedCountries.add(country);
    }

    public void removeVisitedCountry(String country) {
        this.visitedCountries.remove(country);
    }
}
