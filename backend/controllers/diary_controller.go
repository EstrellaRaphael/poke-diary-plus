package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/EstrellaRaphael/poke-diary-plus/backend/config"
	"github.com/EstrellaRaphael/poke-diary-plus/backend/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var diaryCollection = config.GetCollection("diaries")

// CreateDiary cria um novo diário
func CreateDiary(c *gin.Context) {
	var diary models.Diary
	if err := c.ShouldBindJSON(&diary); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	diary.ID = primitive.NewObjectID()
	diary.CreatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if _, err := diaryCollection.InsertOne(ctx, diary); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar diário"})
		return
	}

	c.JSON(http.StatusCreated, diary)
}

// GetAllDiaries retorna todos os diários
func GetAllDiaries(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := diaryCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar diários"})
		return
	}
	defer cursor.Close(ctx)

	var diaries []models.Diary
	if err := cursor.All(ctx, &diaries); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar resultados"})
		return
	}

	c.JSON(http.StatusOK, diaries)
}

// GetDiaryByID retorna um diário pelo ID
func GetDiaryByID(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var diary models.Diary
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := diaryCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&diary); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Diário não encontrado"})
		return
	}

	c.JSON(http.StatusOK, diary)
}

// UpdateDiary atualiza um diário existente
func UpdateDiary(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var updateData bson.M
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = diaryCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": updateData})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar diário"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Diário atualizado"})
}

// DeleteDiary remove um diário
func DeleteDiary(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = diaryCollection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao excluir diário"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Diário deletado com sucesso"})
}
