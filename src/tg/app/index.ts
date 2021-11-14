import { Telegraf } from 'telegraf';
import { UserMiddleware } from '../middlewares/user.middleware';
import { HelpController } from '../controllers/help.controller';
import { UserContext } from '../types/ctx.type';
import config from '../../common/config';
import { createOrmConnection } from '../../common/database';
import logger from '../../common/logger';
import {wrapper} from "../wrapper";

export class TgModule {
  private telegramApi: Telegraf<UserContext>;
  private helpController: HelpController;

  constructor() {
    this.telegramApi = new Telegraf<UserContext>(config.botToken);

    this.helpController = new HelpController();
  }

  public async init(): Promise<void> {
    await createOrmConnection();

    this.telegramApi.use(UserMiddleware);

    this.telegramApi.hears('/start', wrapper(this.helpController.start.bind(this)));

    logger.info({
      level: 'info',
      message: 'TG Bot Initialization'
    });
    this.telegramApi.launch();
  }
}
