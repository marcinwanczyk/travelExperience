package com.example.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.world.entity.User;
import com.example.world.service.UserService;

@Controller
public class HomeController {
    
    private UserService userService;

    public HomeController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/")
    public String landingPage(){
        return "landing";
    }
    @GetMapping("/world")
    public String worldPage(Model model){
        User currUser = userService.getCurrentUser();
        model.addAttribute("email", currUser.getEmail());
        model.addAttribute("username", currUser.getUsername());
        return "world";
    }

}
