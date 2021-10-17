package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/kitt3911/github-unfollowers/config"
	"github.com/kitt3911/github-unfollowers/database"
	"github.com/kitt3911/github-unfollowers/types"
)

func processFollowers(w http.ResponseWriter, r *http.Request) {
	rows, err := database.Database.Query("SELECT * FROM users")
	if err != nil {
		panic(err)
	}
	var users []types.User
	rows.Scan(users)
	fmt.Println(users)
	resp, _ := json.Marshal(users)
	w.Write([]byte(resp))
}

func main() {
	http.HandleFunc("/followers", processFollowers)
	port, _ := strconv.Atoi(config.Get().Port)
	dsn := fmt.Sprintf(":%d", port)
	log.Fatal(http.ListenAndServe(dsn, nil))
}
