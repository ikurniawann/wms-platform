// internal/inventory/module.go
// Inventory module stub

package inventory

import "github.com/gin-gonic/gin"

// Module for inventory
type Module struct{}

// NewModule creates inventory module
func NewModule(db interface{}) *Module {
	return &Module{}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/stocks", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "inventory", "status": "ready"})
	})
}
