// internal/inventory/module.go
// Inventory module

package inventory

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Module for inventory
type Module struct {
	db *gorm.DB
}

// NewModule creates inventory module
func NewModule(db *gorm.DB) *Module {
	return &Module{db: db}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/stocks", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "inventory", "status": "ready"})
	})
}
