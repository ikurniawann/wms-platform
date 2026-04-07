// internal/product/repository/repository.go
// Data access layer

package repository

import (
	"context"

	"github.com/ikurniawann/wms-platform/internal/product/model"
	"gorm.io/gorm"
)

// Repository for product data access
type Repository struct {
	db *gorm.DB
}

// New creates repository
func New(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

// List returns paginated products
func (r *Repository) List(ctx context.Context, offset, limit int) ([]model.Product, int64, error) {
	var products []model.Product
	var total int64

	// Count total
	if err := r.db.Model(&model.Product{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results
	err := r.db.Offset(offset).Limit(limit).Find(&products).Error
	if err != nil {
		return nil, 0, err
	}

	return products, total, nil
}

// Get returns single product
func (r *Repository) Get(ctx context.Context, id uint64) (*model.Product, error) {
	var product model.Product
	if err := r.db.First(&product, id).Error; err != nil {
		return nil, err
	}
	return &product, nil
}

// Create inserts new product
func (r *Repository) Create(ctx context.Context, product *model.Product) error {
	return r.db.Create(product).Error
}

// Update updates product
func (r *Repository) Update(ctx context.Context, product *model.Product) error {
	return r.db.Save(product).Error
}

// Delete soft deletes product
func (r *Repository) Delete(ctx context.Context, id uint64) error {
	return r.db.Delete(&model.Product{}, id).Error
}
