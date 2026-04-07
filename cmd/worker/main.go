// backend/cmd/worker/main.go
// Background Worker Entry Point

package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ikurniawann/wms-platform/internal/shared/config"
	"github.com/ikurniawann/wms-platform/internal/shared/database"
	"github.com/joho/godotenv"
)

func main() {
	// Load env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize config
	cfg := config.Load()

	// Connect to database
	db, err := database.Connect(cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close(db)

	log.Println("✅ Worker database connected!")
	log.Println("🔄 Background worker starting...")

	// Setup graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	// Work ticker
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	// Run worker loop
	for {
		select {
		case <-sigChan:
			log.Println("👋 Worker shutting down...")
			return
		case <-ticker.C:
			// Process background jobs
			processJobs(db)
		}
	}
}

func processJobs(db interface{}) {
	// TODO: Implement background job processing
	// - Low stock alerts
	// - Expired stock notifications
	// - Order status updates
	// - Daily reports
	log.Println("📋 Processing background jobs...")
}
