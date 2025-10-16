package com.example.world.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.world.entity.User;
import com.example.world.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private HttpServletRequest request;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean isAuthenticated() {
        HttpSession session = request.getSession(false);
        return session != null && session.getAttribute("currentUserEmail") != null;
    }

    public User getCurrentUser() {
        HttpSession session = request.getSession(false);
        if (session == null) return null;
        String email = (String) session.getAttribute("currentUserEmail");
        return email != null ? userRepository.findByEmail(email) : null;
    }

    public int login(User user, RedirectAttributes redirectAttributes) {
        User check_login = userRepository.findByEmail(user.getEmail());
        if (check_login == null)
            return -1;
        else if (!passwordEncoder.matches(user.getPassword(), check_login.getPassword())) {
            return 0;
        } else {
            // Security: Regenerate session ID every login
            HttpSession oldSession = request.getSession(false);
            if (oldSession != null) {
                oldSession.invalidate();
            }
            // Create new session with new ID
            HttpSession newSession = request.getSession(true);
            newSession.setAttribute("currentUserEmail", user.getEmail());
            return 1;
        }
    }

    public void logout() {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    // conditions for the processRegister method in AuthController
    public boolean register(User user, RedirectAttributes redirectAttributes) {
        User check_mail = userRepository.findByEmail(user.getEmail());
        if (check_mail != null) {
            return false;
        }
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        
        // Regenerate session ID
        HttpSession oldSession = request.getSession(false);
        if (oldSession != null) {
            oldSession.invalidate();
        }
        // Auto-login after registration with new session ID
        HttpSession newSession = request.getSession(true);
        newSession.setAttribute("currentUserEmail", user.getEmail());
        return true;
    }
}
