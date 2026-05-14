package com.example.healthform;

import com.example.healthform.config.DatabaseUrlConfigurer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthFormApplication {
    public static void main(String[] args) {
        DatabaseUrlConfigurer.configureFromEnvironment();
        SpringApplication.run(HealthFormApplication.class, args);
    }
}
