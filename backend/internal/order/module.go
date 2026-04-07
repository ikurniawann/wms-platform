// internal/order/module.go
// Order module stub

package order

import "github.com/gin-gonic/gin"

// Module for orders
type Module struct{}

// NewModule creates order module
func NewModule(db interface{}) *Module {
	return &Module{}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "order", "status": "ready"})
	})
}
