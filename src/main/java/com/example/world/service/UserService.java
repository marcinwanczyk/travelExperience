package com.example.world.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.world.entity.User;
import com.example.world.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private String currUser;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User getCurrentUser() {
        return userRepository.findByEmail(currUser);
    }

    // conditions for the processLogin method in AuthController
    public int login(User user, RedirectAttributes redirectAttributes) {
        User check_login = userRepository.findByEmail(user.getEmail());
        if (check_login == null)
            return -1;
        else if (!passwordEncoder.matches(user.getPassword(), check_login.getPassword())) {
            return 0;
        } else {
            currUser = user.getEmail();
            return 1;
        }
    }

    public void logout() {
        currUser = null;
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
        currUser = user.getEmail();
        return true;
    }
}
