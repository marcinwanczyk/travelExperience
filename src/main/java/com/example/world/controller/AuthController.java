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
        int checkLogin = userService.login(user, redirectAttributes);
        if (checkLogin == -1) {
            redirectAttributes.addFlashAttribute("message", "Email doesn't exist, try again!");
            return "redirect:/";
        } else if (checkLogin == 0) {
            redirectAttributes.addFlashAttribute("message", "Wrong password, try again!");
            return "redirect:/";
        } else
            return "redirect:/world";
    }

    // TODO: fix registering(while passing existing credentials, jumps back to login
    // form)
    @PostMapping("/register")
    public String processRegister(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        boolean checkRegister = userService.register(user, redirectAttributes);
        if (!checkRegister) {
            redirectAttributes.addFlashAttribute("message", "Email already exists, try again!");
            // redirectAttributes.addFlashAttribute("showRegister", true);
            return "redirect:/";
        }
        return "redirect:/world";
    }

}
