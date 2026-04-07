// internal/product/model/product.go
// Domain model

package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Product represents a product
type Product struct {
	ID               uint64         `gorm:"primaryKey" json:"id"`
	UUID             uuid.UUID      `gorm:"type:uuid;default:gen_random_uuid()" json:"uuid"`
	CompanyID        uint64         `gorm:"not null;index" json:"company_id"`
	Code             string         `gorm:"size:100;not null;uniqueIndex:idx_product_code" json:"code"`
	SKU              string         `gorm:"size:100" json:"sku,omitempty"`
	Barcode          string         `gorm:"size:100" json:"barcode,omitempty"`
	Name             string         `gorm:"size:250;not null" json:"name"`
	Description      string         `gorm:"type:text" json:"description,omitempty"`
	CategoryID       *uint64         `json:"category_id,omitempty"`
	Brand            string         `gorm:"size:100" json:"brand,omitempty"`
	TrackInventory   bool           `gorm:"default:true" json:"track_inventory"`
	IsService        bool           `gorm:"default:false" json:"is_service"`
	IsActive         bool           `gorm:"default:true" json:"is_active"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName specifies table name
func (Product) TableName() string {
	return "products"
}
