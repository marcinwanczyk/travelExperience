package com.example.world.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.world.component.NoCacheInterceptor;
import com.example.world.component.AuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authFilter;
    private final NoCacheInterceptor noStore;

    public WebConfig(AuthInterceptor authFilter, NoCacheInterceptor noStore) {
        this.authFilter = authFilter;
        this.noStore = noStore;
    }

    // @SuppressWarnings("null")
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    // registry.addMapping("/**")
    // .allowedOrigins("https://worldexpo.netlify.app")
    // .allowedMethods("GET", "POST", "PUT", "DELETE")
    // .allowCredentials(true);
    // }

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authFilter)
                .addPathPatterns("/world", "/api/**")
                .excludePathPatterns("/", "/login", "/register", "/css/**", "/js/**", "/images/**", "/api/login",
                        "/api/register");

        // brak cache dla stron z autoryzacją
        registry.addInterceptor(noStore)
                .addPathPatterns("/world", "/api/**");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
