package auth

import (
	"github.com/EstrellaRaphael/poke-diary-plus/backend/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {
	authGroup := rg.Group("/auth")

	authGroup.POST("/register", controllers.Register)
	authGroup.POST("/login", controllers.Login)
}
