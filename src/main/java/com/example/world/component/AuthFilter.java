package com.example.world.component;


import org.springframework.stereotype.Component;


import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import com.example.world.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter implements LogoutHandler {

    private UserService userService;

    public AuthFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // Invalidate session and clear authentication
            userService.logout();
        }
    }

