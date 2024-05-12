package com.example.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.world.entity.User;
import com.example.world.service.UserService;


@Controller
public class AuthController {

    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String processLogin(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        boolean checkLogin = userService.login(user, redirectAttributes);
        if(!checkLogin) {
            redirectAttributes.addFlashAttribute("message", "User not found or bad password");
            return "redirect:/";
        }
        return "redirect:/world";
    }

    @PostMapping("/register")
    public String processRegister(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        boolean checkRegister = userService.register(user, redirectAttributes);
        if(!checkRegister) {
            redirectAttributes.addFlashAttribute("message", "Email already exists");
            return "redirect:/";
        }
        return "redirect:/world";
    }

}
