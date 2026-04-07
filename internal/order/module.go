// internal/order/module.go
// Order module

package order

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Module for orders
type Module struct {
	db *gorm.DB
}

// NewModule creates order module
func NewModule(db *gorm.DB) *Module {
	return &Module{db: db}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "order", "status": "ready"})
	})
}
