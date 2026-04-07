// internal/shared/config/config.go
// Application configuration

package config

import (
	"os"
	"strconv"
)

// Config holds all application configuration
type Config struct {
	Database    DatabaseConfig
	JWT         JWTConfig
	Server      ServerConfig
	Environment string
}

// DatabaseConfig for database connection
type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
	SSLMode  string
}

// JWTConfig for authentication
type JWTConfig struct {
	Secret string
}

// ServerConfig for HTTP server
type ServerConfig struct {
	Port string
}

// Load loads configuration from environment
func Load() Config {
	return Config{
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "password"),
			Name:     getEnv("DB_NAME", "wms_db"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		JWT: JWTConfig{
			Secret: getEnv("JWT_SECRET", "your-secret-key"),
		},
		Server: ServerConfig{
			Port: getEnv("PORT", "8080"),
		},
		Environment: getEnv("ENV", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intVal, err := strconv.Atoi(value); err == nil {
			return intVal
		}
	}
	return defaultValue
}
