import PromiseRouter from 'express-promise-router';
import logger from '../../libs/logger';
import { FollowersController } from './followers.controller';
import { GitHubApiService } from './github-api.service';

export class FollowersRouter {
  public readonly router;
  private readonly controller;

  constructor() {
    this.router = PromiseRouter();
    this.controller = new FollowersController();
    console.log(this.controller)
    this.init();
  }

  public async init() {
    this.router.post('/followers', this.controller.getFollowers);
    logger.info({
      level: 'info',
      message: '[/internal/follower] POST method',
    });
  }
}
