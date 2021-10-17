package config

import (
	"github.com/joho/godotenv"
	"os"
)

type DatabaseConfig struct {
	User     string
	Password string
	Name     string
	Host     string
	Port     string
}

type RabbitMQConfig struct {
	Host string `json:"host"`
	Port string `json:"port"`
}

type Config struct {
	Port     string
	DB       DatabaseConfig
	RabbitMQ RabbitMQConfig
}

var config = New()

func Get() *Config {
	return config
}

func New() *Config {
	_ = godotenv.Load()
	return &Config{
		DB: DatabaseConfig{
			User:     getEnv("DATABASE_USER", ""),
			Password: getEnv("DATABASE_PASS", ""),
			Name:     getEnv("DATABASE_NAME", ""),
			Host:     getEnv("DATABASE_HOST", ""),
			Port:     getEnv("DATABASE_PORT", ""),
		},
		RabbitMQ: RabbitMQConfig{
			Host: getEnv("RABBIT_HOST", ""),
			Port: getEnv("RABBIT_PORT", "5672"),
		},
		Port: getEnv("PORT", "3000"),
	}
}

func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
