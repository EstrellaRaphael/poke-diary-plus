package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Progress struct {
	Caught  []string `json:"caught" bson:"caught"`
	Fainted []string `json:"fainted" bson:"fainted"`
	Badges  []string `json:"badges" bson:"badges"`
}

type Challenge struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Type     string             `json:"type" bson:"type"`
	Rules    string             `json:"rules,omitempty" bson:"rules,omitempty"`
	Status   string             `json:"status" bson:"status"` // ativo | completo | falhou
	Owner    string             `json:"owner" bson:"owner"`
	Progress Progress           `json:"progress" bson:"progress"`
}
