package diary

import (
	"github.com/EstrellaRaphael/poke-diary-plus/backend/controllers"
	"github.com/gin-gonic/gin"
)

func DiaryRoutes(rg *gin.RouterGroup) {
	diaryGroup := rg.Group("/diary")

	diaryGroup.POST("", controllers.CreateDiary)
	diaryGroup.GET("", controllers.GetAllDiaries)
	diaryGroup.GET("/:id", controllers.GetDiaryByID)
	diaryGroup.PUT("/:id", controllers.UpdateDiary)
	diaryGroup.DELETE("/:id", controllers.DeleteDiary)
}
