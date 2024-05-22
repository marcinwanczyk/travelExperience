package com.example.world.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.world.entity.User;
import com.example.world.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;
    private String currUser;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        return userRepository.findByEmail(currUser);

    }

    // conditions for the processLogin method in AuthController
    public int login(User user, RedirectAttributes redirectAttributes) {
        User check_login = userRepository.findByEmail(user.getEmail());
        if (check_login == null)
            return -1;
        else if (!check_login.getPassword().equals(user.getPassword())) {
            return 0;
        } else {
            currUser = user.getEmail();
            return 1;
        }
    }

    // conditions for the processRegister method in AuthController
    public boolean register(User user, RedirectAttributes redirectAttributes) {
        User check_mail = userRepository.findByEmail(user.getEmail());
        if (check_mail != null) {
            return false;
        }
        userRepository.save(user);
        currUser = user.getEmail();
        return true;
    }
}
