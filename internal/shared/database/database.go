// internal/shared/database/database.go
// Database connection and migrations

package database

import (
	"fmt"
	"log"

	"github.com/ikurniawann/wms-platform/internal/shared/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Connect establishes database connection
func Connect(cfg config.DatabaseConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		cfg.Host, cfg.User, cfg.Password, cfg.Name, cfg.Port, cfg.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}

// Close closes database connection
func Close(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err == nil {
		sqlDB.Close()
	}
}

// Migrate runs auto-migration
func Migrate(db *gorm.DB) error {
	log.Println("Running database migrations...")
	
	// Import all models for migration
	// This will be auto-generated
	return db.AutoMigrate(
	// Models will be added here
	)
}
