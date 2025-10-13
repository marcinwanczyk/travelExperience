package com.example.world.controller;

import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.world.entity.User;
import com.example.world.repository.UserRepository;
import com.example.world.service.ImgService;
import com.example.world.service.UserService;
import java.util.*;

@RestController
@RequestMapping("/api/images")
public class ImgController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ImgService imgService;


    public ImgController(UserService userService, UserRepository userRepository, ImgService imgService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.imgService = imgService;
    }

    @PostMapping("/{countryId}")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable String countryId) {
        User user = userService.getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        if (user.getVisitedCountries() == null || !user.getVisitedCountries().contains(countryId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Country not marked as visited");
        }

        try {
            // storing images in mongodb as base64 strings
            String imageData = imgService.createDataUrl(file);

            if (user.getCountryImages() == null) {
                user.setCountryImages(new HashMap<>());
            }

            // save img per user per country
            user.getCountryImages().put(countryId, imageData);
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Image uploaded successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image: " + e.getMessage());
        }
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<?> getImage(@PathVariable String countryId) {
        User user = userService.getCurrentUser();

        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");

        if (user.getCountryImages() == null || !user.getCountryImages().containsKey(countryId))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No images for this country");

        return ResponseEntity.ok(Map.of("imageData", user.getCountryImages().get(countryId)));
    }

    @DeleteMapping("/{countryId}")
    public ResponseEntity<?> deleteImage(@PathVariable String countryId) {
        User user = userService.getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        if (user.getCountryImages() == null || !user.getCountryImages().containsKey(countryId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No images for this country");
        }

        user.getCountryImages().remove(countryId);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Image deleted successfully"));
    }
}
