package database

import (
	"database/sql"
	"fmt"
	"strconv"

	"github.com/kitt3911/github-unfollowers/config"
	_ "github.com/lib/pq"
)

var Database = New()

func New() *sql.DB {
	port, _ := strconv.Atoi(config.Get().DB.Port)
	dsn := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Get().DB.Host, port, config.Get().DB.User, config.Get().DB.Password, config.Get().DB.Name)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		panic(err)
	}
	return db
}
