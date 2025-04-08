package challenge

import (
	"github.com/EstrellaRaphael/poke-diary-plus/backend/controllers"
	"github.com/gin-gonic/gin"
)

// ChallengeRoutes configura todas as rotas relacionadas a desafios.
func ChallengeRoutes(rg *gin.RouterGroup) {
	challengeGroup := rg.Group("/challenge")

	challengeGroup.POST("", controllers.CreateChallenge)
	challengeGroup.GET("", controllers.GetAllChallenges)
	challengeGroup.GET("/:id", controllers.GetChallengeByID)
	challengeGroup.PUT("/:id", controllers.UpdateChallenge)
	challengeGroup.PATCH("/:id", controllers.UpdateChallengeStatus)
	challengeGroup.GET("/:id/progress", controllers.GetChallengeProgress)
	challengeGroup.PUT("/:id/progress", controllers.UpdateChallengeProgress)

}
