// backend/cmd/api/main.go
// API Server Entry Point

package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/ikurniawann/wms-platform/internal/shared/config"
	"github.com/ikurniawann/wms-platform/internal/shared/database"
	"github.com/ikurniawann/wms-platform/internal/customer"
	"github.com/ikurniawann/wms-platform/internal/inventory"
	"github.com/ikurniawann/wms-platform/internal/order"
	"github.com/ikurniawann/wms-platform/internal/product"
	"github.com/ikurniawann/wms-platform/middleware"
	"github.com/joho/godotenv"
)

func main() {
	// Load env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize config
	cfg := config.Load()

	// Parse flags
	var migrateFlag bool
	flag.BoolVar(&migrateFlag, "migrate", false, "Run database migrations")
	flag.Parse()

	// Connect to database
	db, err := database.Connect(cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	log.Println("✅ Database connected!")

	// Run migration if requested
	if migrateFlag {
		log.Println("🔄 Running migrations...")
		if err := database.Migrate(db); err != nil {
			log.Fatalf("Failed to migrate: %v", err)
		}
		log.Println("✅ Migrations complete!")
		return
	}

	// Initialize modules
	productModule := product.NewModule(db)
	orderModule := order.NewModule(db)
	inventoryModule := inventory.NewModule(db)
	customerModule := customer.NewModule(db)

	// Setup Gin
	gin.SetMode(gin.ReleaseMode)
	if cfg.Environment == "development" {
		gin.SetMode(gin.DebugMode)
	}

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.DefaultCORS())

	// Public routes
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "ok",
			"version":   "2.0.0-modular",
			"service":   "wms-platform",
			"modules": []string{"product", "order", "inventory", "customer"},
		})
	})

	// API v1 with auth
	api := r.Group("/api/v1")
	api.Use(middleware.AuthMiddleware(cfg.JWT.Secret))

	// Register module routes
	productModule.RegisterRoutes(api.Group("/products"))
	orderModule.RegisterRoutes(api.Group("/orders"))
	inventoryModule.RegisterRoutes(api.Group("/inventory"))
	customerModule.RegisterRoutes(api.Group("/customers"))

	// Start server
	log.Printf("🚀 API Server starting on port %s", cfg.Server.Port)
	log.Printf("📚 Health: http://localhost:%s/health", cfg.Server.Port)
	
	if err := r.Run(":" + cfg.Server.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
