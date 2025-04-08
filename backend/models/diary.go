package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Diary struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title     string             `bson:"title" json:"title" validate:"required"`
	Game      string             `bson:"game" json:"game" validate:"required"`
	Notes     string             `bson:"notes,omitempty" json:"notes,omitempty"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	Owner     string             `bson:"owner,omitempty" json:"owner,omitempty"` // opcional: pode ser preenchido depois com autenticação
}
