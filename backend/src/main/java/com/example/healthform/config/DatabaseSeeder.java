package com.example.healthform.config;

import com.example.healthform.entity.AppUser;
import com.example.healthform.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Locale;

@Configuration
public class DatabaseSeeder {

    @Value("${admin.username:admin@example.com}")
    private String adminUsername;

    @Value("${admin.password:12345678}")
    private String adminPassword;

    @Value("${doctor.username:doctor@example.com}")
    private String doctorUsername;

    @Value("${doctor.password:12345678}")
    private String doctorPassword;

    @Bean
    CommandLineRunner initDatabase(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            seedOrRepairUser(userRepository, passwordEncoder, adminUsername, adminPassword, "ADMIN");
            seedOrRepairUser(userRepository, passwordEncoder, doctorUsername, doctorPassword, "DOCTOR");
        };
    }

    private void seedOrRepairUser(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String email,
            String rawPassword,
            String role
    ) {
        String normalizedEmail = normalizeEmail(email);
        String normalizedRole = normalizeRole(role);

        if (normalizedEmail.isBlank() || rawPassword == null || rawPassword.isBlank()) {
            System.out.println("Skipped default " + normalizedRole + " user because email or password is empty.");
            return;
        }

        AppUser user = userRepository.findByEmailIgnoreCase(normalizedEmail).orElseGet(AppUser::new);
        boolean isNew = user.getId() == null;
        boolean changed = isNew;

        if (!normalizedEmail.equals(user.getEmail())) {
            user.setEmail(normalizedEmail);
            changed = true;
        }

        if (!normalizedRole.equals(user.getRole())) {
            user.setRole(normalizedRole);
            changed = true;
        }

        if (user.getPassword() == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            changed = true;
        }

        if (changed) {
            userRepository.save(user);
            System.out.println((isNew ? "Created" : "Updated") + " default " + normalizedRole + " user: " + normalizedEmail);
        }
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "USER";
        }
        String normalized = role.trim().toUpperCase(Locale.ROOT);
        return normalized.startsWith("ROLE_") ? normalized.substring("ROLE_".length()) : normalized;
    }
}
