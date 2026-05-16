package com.example.healthform.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> allowedOrigins = new ArrayList<>(Arrays.asList(
                "https://ahmed-al-saadi.onrender.com",
                "http://localhost:3000",
                "http://localhost:5173",
                "https://*.onrender.com"
        ));

        Arrays.stream(frontendUrl.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .forEach(allowedOrigins::add);

        String[] allowedOriginPatterns = allowedOrigins.toArray(String[]::new);
        addApiCorsMapping(registry, "/api", allowedOriginPatterns);
        addApiCorsMapping(registry, "/api/**", allowedOriginPatterns);
    }

    private void addApiCorsMapping(CorsRegistry registry, String pathPattern, String[] allowedOriginPatterns) {
        registry.addMapping(pathPattern)
                .allowedOriginPatterns(allowedOriginPatterns)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
