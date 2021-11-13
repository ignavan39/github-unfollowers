import { Telegraf } from 'telegraf';
import { UserMiddleware } from '../common/middlewares/user.middleware';
import { HelpController } from '../controllers/help.controller';
import { UserContext } from '../types/ctx.type';
import config from '../../common/config';
import { createOrmConnection } from '../../common/database';
import logger from '../../common/logger';

export class AppModule {
  private telegramApi: Telegraf<UserContext>;
  private helpController: HelpController;

  constructor() {
    this.telegramApi = new Telegraf<UserContext>(config.botToken);

    this.helpController = new HelpController();
  }

  public async init(): Promise<void> {
    await createOrmConnection();

    this.telegramApi.use(UserMiddleware);

    this.telegramApi.hears('/start', this.helpController.start);

    logger.info({
      level: 'info',
      message: 'Initialization'
    });
    this.telegramApi.launch();
  }
}
