import * as amqp from 'amqplib';
import config from '../config';
import logger from '../logger';
import { ActionsToBotQueueName, BotToActionsQueueName } from './constants';

export class AMQPTransport {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  async init() {
    const hostname = config.rabbitmq.host;
    const port = config.rabbitmq.port;
    this.connection = await amqp.connect({ hostname, port });
    this.connection.on('error', async (err) => {
      logger.error({
        level: 'error',
        message: 'Connection AMQP error',
      });
      await this.connection.close();
      throw new err();
    });

    this.channel = await this.connection.createChannel();
    this.channel.assertQueue(BotToActionsQueueName);
    this.channel.assertQueue(ActionsToBotQueueName);
  }

  getChannel() {
    return this.channel;
  }

  getConnection() {
    return this.connection;
  }
}

const ampqConnection = new AMQPTransport();
ampqConnection.init();

export default ampqConnection;
