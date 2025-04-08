package main

import (
	"log"
	"os"

	"github.com/EstrellaRaphael/poke-diary-plus/backend/config"
	"github.com/EstrellaRaphael/poke-diary-plus/backend/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Carrega variáveis do .env
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️  Arquivo .env não encontrado, usando variáveis padrão")
	}

	// Conecta ao MongoDB
	config.ConnectDB()

	// Inicia o servidor Gin
	router := gin.Default()

	// Define as rotas da API
	routes.RegisterRoutes(router)

	// Porta
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Servidor rodando em http://localhost:%s\n", port)
	log.Fatal(router.Run(":" + port))
}
