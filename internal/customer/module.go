// internal/customer/module.go
// Customer module stub

package customer

import "github.com/gin-gonic/gin"

// Module for customers
type Module struct{}

// NewModule creates customer module
func NewModule(db interface{}) *Module {
	return &Module{}
}

// RegisterRoutes registers routes
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{"module": "customer", "status": "ready"})
	})
}
