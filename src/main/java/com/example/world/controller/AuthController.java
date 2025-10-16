package com.example.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.world.entity.User;
import com.example.world.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class AuthController {

    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String showLoginPage(HttpServletRequest request, Model model) {
        // Check for error message from interceptor
        String errorMessage = (String) request.getSession().getAttribute("errorMessage");
        if (errorMessage != null) {
            model.addAttribute("message", errorMessage);
            request.getSession().removeAttribute("errorMessage");
        }
        return "landing";
    }

    @PostMapping({ "/", "/login" })
    public String processLogin(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        int checkLogin = userService.login(user, redirectAttributes);
        if (checkLogin == -1 || checkLogin == 0) {
            redirectAttributes.addFlashAttribute("message", "Email or password is incorrect!");
            return "redirect:/";
        }

        return "redirect:/world";
    }

    @PostMapping("/register")
    public String processRegister(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        boolean checkRegister = userService.register(user, redirectAttributes);
        if (!checkRegister) {
            redirectAttributes.addFlashAttribute("message", "Email already exists, try again!");
            return "redirect:/";

        }
        return "redirect:/world";
    }

    @PostMapping("/logout")
    public String processLogout(HttpServletRequest request, HttpServletResponse response,
            RedirectAttributes redirectAttributes) {
        userService.logout();

        var session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        redirectAttributes.addFlashAttribute("message", "Logout successful!");
        return "redirect:/";
    }

}
