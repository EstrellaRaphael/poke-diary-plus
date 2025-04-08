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

var challengeCollection = config.GetCollection("challenges")

// CreateChallenge cria um novo desafio
func CreateChallenge(c *gin.Context) {
	var challenge models.Challenge
	if err := c.ShouldBindJSON(&challenge); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	challenge.ID = primitive.NewObjectID()
	challenge.Status = "ativo"
	challenge.Progress = models.Progress{}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if _, err := challengeCollection.InsertOne(ctx, challenge); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar desafio"})
		return
	}

	c.JSON(http.StatusCreated, challenge)
}

// GetAllChallenges retorna todos os desafios
func GetAllChallenges(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := challengeCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar desafios"})
		return
	}
	defer cursor.Close(ctx)

	var challenges []models.Challenge
	if err := cursor.All(ctx, &challenges); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao ler os resultados"})
		return
	}

	c.JSON(http.StatusOK, challenges)
}

// GetChallengeByID retorna um desafio por ID
func GetChallengeByID(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var challenge models.Challenge
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := challengeCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&challenge); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Desafio não encontrado"})
		return
	}

	c.JSON(http.StatusOK, challenge)
}

// UpdateChallenge atualiza os dados de um desafio
func UpdateChallenge(c *gin.Context) {
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

	if _, err := challengeCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": updateData}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar desafio"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Desafio atualizado"})
}

// UpdateChallengeStatus altera o status do desafio
func UpdateChallengeStatus(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var payload struct {
		Status string `json:"status"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil || (payload.Status != "completo" && payload.Status != "falhou") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status inválido"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if _, err := challengeCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": bson.M{"status": payload.Status}}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status atualizado"})
}

// GetChallengeProgress retorna o progresso do desafio
func GetChallengeProgress(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var result struct {
		Progress models.Progress `bson:"progress"`
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := challengeCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&result); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Desafio não encontrado"})
		return
	}

	c.JSON(http.StatusOK, result.Progress)
}

// UpdateChallengeProgress atualiza o progresso do desafio
func UpdateChallengeProgress(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var progress models.Progress
	if err := c.ShouldBindJSON(&progress); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload inválido"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = challengeCollection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": bson.M{"progress": progress}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar progresso"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Progresso atualizado"})
}

// GetChallengesByTrainer retorna os desafios de um treinador específico
func GetChallengesByTrainer(c *gin.Context) {
	username := c.Param("username")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := challengeCollection.Find(ctx, bson.M{"owner": username})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar desafios"})
		return
	}
	defer cursor.Close(ctx)

	var challenges []models.Challenge
	if err := cursor.All(ctx, &challenges); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar resultados"})
		return
	}

	c.JSON(http.StatusOK, challenges)
}
