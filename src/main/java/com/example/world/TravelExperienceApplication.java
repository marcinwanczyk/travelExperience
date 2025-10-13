package com.example.world;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@SpringBootApplication
public class TravelExperienceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelExperienceApplication.class, args);
	}

	@Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

}

