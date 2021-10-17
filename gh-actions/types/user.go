package types

type User struct {
	Id         string `json:"id"`
	Name       string `json:"name"`
	TelegramId string `json:"telegram_id"`
	UpdatedAt  string `json:"updated_at"`
	CreatedAt  string `json:"created_at"`
	Meta       string `json:"meta"`
}