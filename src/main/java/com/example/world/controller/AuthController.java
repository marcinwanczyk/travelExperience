package com.example.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    @GetMapping("/")
    public String landingPage(){
        return "landing";
    }

    @PostMapping("/login")
    public String processLogin() {
        return "redirect:/world";
    }

    @PostMapping("/register")
    public String processRegister() {
        return "redirect:/world";
    }

}
