package rabbit

import (
	"fmt"
	"strconv"

	"github.com/kitt3911/github-unfollowers/config"
	"github.com/streadway/amqp"
)

type AmpqConnection struct {
	Channel    *amqp.Channel
	Connection *amqp.Connection
}

var AMPQ = New()

func New() AmpqConnection {
	port, _ := strconv.Atoi(config.Get().RabbitMQ.Port)
	dsn := fmt.Sprintf("amqp://guest:guest@%s:%d/", config.Get().RabbitMQ.Host, port)
	conn, err := amqp.Dial(dsn)
	if err != nil {
		panic(err)
	}
	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	return AmpqConnection{
		Channel:    ch,
		Connection: conn,
	}
}
