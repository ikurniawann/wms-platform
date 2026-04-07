// internal/product/service/service.go
// Business logic for products

package service

import (
	"context"

	"github.com/ikurniawann/wms-platform/internal/product/model"
	"github.com/ikurniawann/wms-platform/internal/product/repository"
)

// Service contains business logic
type Service struct {
	repo *repository.Repository
}

// New creates service
func New(repo *repository.Repository) *Service {
	return &Service{repo: repo}
}

// List returns paginated products
func (s *Service) List(ctx context.Context, page, pageSize int) ([]model.Product, int64, error) {
	offset := (page - 1) * pageSize
	return s.repo.List(ctx, offset, pageSize)
}

// Get returns single product
func (s *Service) Get(ctx context.Context, id uint64) (*model.Product, error) {
	return s.repo.Get(ctx, id)
}

// Create creates new product
func (s *Service) Create(ctx context.Context, companyID uint64, req interface{}) (*model.Product, error) {
	// Type assertion and conversion
	createReq := req.(*struct {
		Code           string
		SKU            string
		Barcode        string
		Name           string
		Description    string
		CategoryID     *uint64
		Brand          string
		TrackInventory bool
		IsService      bool
		IsActive       bool
	})

	product := &model.Product{
		CompanyID:      companyID,
		Code:            createReq.Code,
		SKU:             createReq.SKU,
		Barcode:         createReq.Barcode,
		Name:            createReq.Name,
		Description:     createReq.Description,
		CategoryID:      createReq.CategoryID,
		Brand:           createReq.Brand,
		TrackInventory:  createReq.TrackInventory,
		IsService:       createReq.IsService,
		IsActive:        createReq.IsActive,
	}

	if err := s.repo.Create(ctx, product); err != nil {
		return nil, err
	}

	return product, nil
}

// Update updates product
func (s *Service) Update(ctx context.Context, id uint64, req interface{}) (*model.Product, error) {
	product, err := s.repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	// Apply updates
	updates := req.(*struct {
		Code           string  `json:"code"`
		Name           string  `json:"name"`
		Description    string  `json:"description"`
		CategoryID     *uint64 `json:"category_id"`
		Brand          string  `json:"brand"`
		TrackInventory *bool   `json:"track_inventory"`
		IsService      *bool   `json:"is_service"`
		IsActive       *bool   `json:"is_active"`
	})

	if updates.Code != "" {
		product.Code = updates.Code
	}
	if updates.Name != "" {
		product.Name = updates.Name
	}

	if err := s.repo.Update(ctx, product); err != nil {
		return nil, err
	}

	return product, nil
}

// Delete soft deletes product
func (s *Service) Delete(ctx context.Context, id uint64) error {
	return s.repo.Delete(ctx, id)
}
