package com.example.healthform.config;

import com.example.healthform.entity.AppUser;
import com.example.healthform.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${doctor.username}")
    private String doctorUsername;

    @Value("${doctor.password}")
    private String doctorPassword;

    @Bean
    CommandLineRunner initDatabase(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            seedUser(userRepository, passwordEncoder, adminUsername, adminPassword, "ADMIN");
            seedUser(userRepository, passwordEncoder, doctorUsername, doctorPassword, "DOCTOR");
        };
    }

    private void seedUser(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String email,
            String rawPassword,
            String role
    ) {
        if (userRepository.findByEmail(email).isPresent()) {
            return;
        }

        AppUser user = new AppUser();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        userRepository.save(user);
        System.out.println("Created default " + role + " user: " + email);
    }
}
