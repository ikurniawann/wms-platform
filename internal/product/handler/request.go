// internal/product/handler/request.go
// Request DTOs

package handler

// CreateProductRequest for creating product
type CreateProductRequest struct {
	Code             string  `json:"code" binding:"required"`
	SKU              string  `json:"sku"`
	Barcode          string  `json:"barcode"`
	Name             string  `json:"name" binding:"required"`
	Description      string  `json:"description"`
	CategoryID       *uint64 `json:"category_id"`
	Brand            string  `json:"brand"`
	TrackInventory   bool    `json:"track_inventory"`
	IsService        bool    `json:"is_service"`
	IsActive         bool    `json:"is_active"`
}

// UpdateProductRequest for updating product
type UpdateProductRequest struct {
	Code             string  `json:"code"`
	SKU              string  `json:"sku"`
	Barcode          string  `json:"barcode"`
	Name             string  `json:"name"`
	Description      string  `json:"description"`
	CategoryID       *uint64 `json:"category_id"`
	Brand            string  `json:"brand"`
	TrackInventory   *bool   `json:"track_inventory"`
	IsService        *bool   `json:"is_service"`
	IsActive         *bool   `json:"is_active"`
}
