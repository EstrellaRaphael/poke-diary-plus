package routes

import (
	"github.com/EstrellaRaphael/poke-diary-plus/backend/controllers"
	"github.com/EstrellaRaphael/poke-diary-plus/backend/routes/challenge"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")

	api.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	challenge.ChallengeRoutes(api)
	api.GET("/trainer/:username/challenges", controllers.GetChallengesByTrainer)

}
