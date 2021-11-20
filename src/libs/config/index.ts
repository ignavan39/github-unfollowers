import logger from '../logger';

export type DatabaseConfig = {
  user: string;
  password: string;
  name: string;
  port: number;
  host: string;
};

export type RabbitMQConfig = {
  port: number;
  host: string;
}

export type Config = {
  botToken: string;
  database: DatabaseConfig;
  rabbitmq: RabbitMQConfig;
};
export class ConfigService {
  private config: Config;

  constructor() {
    this.config = {
      botToken: this.getEnvironmentValueByKey('BOT_TOKEN'),
      database: {
        user: this.getEnvironmentValueByKey('DATABASE_USER'),
        password: this.getEnvironmentValueByKey('DATABASE_PASS'),
        name: this.getEnvironmentValueByKey('DATABASE_NAME'),
        host: this.getEnvironmentValueByKey('DATABASE_HOST'),
        port:
          Number.parseInt(this.getEnvironmentValueByKey('DATABASE_PORT')) ||
          5432,
      },
      rabbitmq: {
        host: this.getEnvironmentValueByKey('RABBIT_HOST'),
        port: Number.parseInt(this.getEnvironmentValueByKey('RABBIT_PORT'))
      }
    };
  }

  private getEnvironmentValueByKey(key: string): string {
    const value = process.env[key];
    if (!value) {
      logger.error({
        level: 'error',
        message: 'Invalid environment key'
      })
      throw new Error(`Invalid environment ${key}`);
    }

    return value;
  }

  public getConfig(): Config {
    return this.config;
  }
}

const configService = new ConfigService();
export default configService.getConfig();
