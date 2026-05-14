package com.example.healthform.config;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public final class DatabaseUrlConfigurer {

    private static final String DATASOURCE_URL_PROPERTY = "spring.datasource.url";
    private static final String DATASOURCE_USERNAME_PROPERTY = "spring.datasource.username";
    private static final String DATASOURCE_PASSWORD_PROPERTY = "spring.datasource.password";
    private static final String DATASOURCE_DRIVER_PROPERTY = "spring.datasource.driver-class-name";
    private static final String SPRING_JPA_DATABASE_PLATFORM = "spring.jpa.database-platform";
    private static final String POSTGRES_DRIVER = "org.postgresql.Driver";
    private static final String POSTGRES_DIALECT = "org.hibernate.dialect.PostgreSQLDialect";

    private DatabaseUrlConfigurer() {
    }

    public static void configureFromEnvironment() {
        if (hasText(System.getProperty(DATASOURCE_URL_PROPERTY))) {
            return;
        }

        String rawDatabaseUrl = System.getenv("DATABASE_URL");
        if (!hasText(rawDatabaseUrl)) {
            return;
        }

        String jdbcUrl = toJdbcUrl(rawDatabaseUrl);
        if (!hasText(jdbcUrl)) {
            return;
        }

        System.setProperty(DATASOURCE_URL_PROPERTY, jdbcUrl);

        if (isPostgresUrl(jdbcUrl)) {
            setSystemPropertyIfMissing(DATASOURCE_DRIVER_PROPERTY, POSTGRES_DRIVER);
            setSystemPropertyIfMissing(SPRING_JPA_DATABASE_PLATFORM, POSTGRES_DIALECT);
        }

        Credentials credentials = extractCredentials(rawDatabaseUrl);
        setSystemPropertyIfMissing(
                DATASOURCE_USERNAME_PROPERTY,
                firstText(System.getenv("DB_USERNAME"), credentials.username())
        );
        setSystemPropertyIfMissing(
                DATASOURCE_PASSWORD_PROPERTY,
                firstText(System.getenv("DB_PASSWORD"), credentials.password())
        );
    }

    private static String toJdbcUrl(String rawUrl) {
        String trimmed = rawUrl.trim();
        if (trimmed.startsWith("jdbc:")) {
            return trimmed;
        }

        if (!trimmed.startsWith("postgres://") && !trimmed.startsWith("postgresql://")) {
            return trimmed;
        }

        try {
            URI uri = URI.create(trimmed);
            StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://").append(uri.getHost());
            if (uri.getPort() != -1) {
                jdbcUrl.append(":").append(uri.getPort());
            }
            if (hasText(uri.getRawPath())) {
                jdbcUrl.append(uri.getRawPath());
            }
            if (hasText(uri.getRawQuery())) {
                jdbcUrl.append("?").append(uri.getRawQuery());
            }
            return jdbcUrl.toString();
        } catch (IllegalArgumentException ex) {
            return trimmed;
        }
    }

    private static Credentials extractCredentials(String rawUrl) {
        try {
            URI uri = URI.create(rawUrl.trim());
            String userInfo = uri.getRawUserInfo();
            if (!hasText(userInfo)) {
                return Credentials.EMPTY;
            }

            String[] parts = userInfo.split(":", 2);
            String username = decode(parts[0]);
            String password = parts.length > 1 ? decode(parts[1]) : "";
            return new Credentials(username, password);
        } catch (IllegalArgumentException ex) {
            return Credentials.EMPTY;
        }
    }

    private static String decode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }

    private static String firstText(String... values) {
        for (String value : values) {
            if (hasText(value)) {
                return value;
            }
        }
        return "";
    }

    private static void setSystemPropertyIfMissing(String key, String value) {
        if (!hasText(System.getProperty(key)) && hasText(value)) {
            System.setProperty(key, value);
        }
    }

    private static boolean isPostgresUrl(String url) {
        return url.startsWith("jdbc:postgresql:");
    }

    private static boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private record Credentials(String username, String password) {
        private static final Credentials EMPTY = new Credentials("", "");
    }
}
