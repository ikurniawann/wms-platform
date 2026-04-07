// internal/customer/module.go
// Customer module

package customer

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Module for customers
type Module struct {
	db *gorm.DB
}

// NewModule creates customer module
func NewModule(db *gorm.DB) *Module {
	return &Module{db: db}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "customer", "status": "ready"})
	})
}
