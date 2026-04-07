// internal/product/module.go
// Product module - self-contained domain

package product

import (
	"github.com/gin-gonic/gin"
	"github.com/ikurniawann/wms-platform/backend/internal/product/handler"
	"github.com/ikurniawann/wms-platform/backend/internal/product/repository"
	"github.com/ikurniawann/wms-platform/backend/internal/product/service"
	"gorm.io/gorm"
)

// Module encapsulates product domain
type Module struct {
	handler *handler.Handler
	service *service.Service
	repo    *repository.Repository
}

// NewModule creates product module
func NewModule(db *gorm.DB) *Module {
	repo := repository.New(db)
	svc := service.New(repo)
	h := handler.New(svc)

	return &Module{
		handler: h,
		service: svc,
		repo:    repo,
	}
}

// RegisterRoutes registers product routes
func (m *Module) RegisterRoutes(rg *gin.RouterGroup) {
	m.handler.RegisterRoutes(rg)
}
