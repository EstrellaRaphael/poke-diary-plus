package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Erro ao criar cliente MongoDB: ", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("Erro ao conectar ao MongoDB: ", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Erro ao pingar o MongoDB: ", err)
	}

	fmt.Println("✅ Conectado ao MongoDB com sucesso")
	DB = client
}

func GetCollection(collectionName string) *mongo.Collection {
	return DB.Database("pokediary").Collection(collectionName)
}
