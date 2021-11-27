import express, { Application } from 'express';
import logger from '../../libs/logger';
import { FollowersRouter } from '../followers/followers.router';

export class AppModule {
  private readonly followersRouter: FollowersRouter;
  private readonly app: Application;

  constructor() {
    this.followersRouter = new FollowersRouter();
    this.app = express();
    this.initRoutes();
  }

  public initRoutes() {
    this.app.use('/internal', this.followersRouter.router);
  }

  public async listen(): Promise<void> {
    logger.info({
      level: 'info',
      message: 'API INIT',
    });
    await this.app.listen(8000);
  }
}
