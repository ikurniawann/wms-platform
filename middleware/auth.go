// middleware/auth.go
// JWT authentication middleware

package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware validates JWT tokens
func AuthMiddleware(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// Extract token
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Extract claims
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			c.Set("claims", claims)
			if sub, ok := claims["sub"].(string); ok {
				c.Set("user_id", sub)
			}
			if email, ok := claims["email"].(string); ok {
				c.Set("email", email)
			}
			if companyID, ok := claims["company_id"].(float64); ok {
				c.Set("company_id", uint64(companyID))
			}
			if role, ok := claims["role"].(string); ok {
				c.Set("role", role)
			}
		}

		c.Next()
	}
}

// GetCompanyID extracts company from context
func GetCompanyID(c *gin.Context) uint64 {
	if id, exists := c.Get("company_id"); exists {
		if uintID, ok := id.(uint64); ok {
			return uintID
		}
	}
	return 0
}
