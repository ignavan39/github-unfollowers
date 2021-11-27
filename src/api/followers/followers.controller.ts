import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { EventEmitter } from '../../libs/event-emitter';
import { Follower, User } from '../../libs/types/user.type';
import { GitHubApiService } from './github-api.service';
import { ApiService } from '../api-service.interface';

export class FollowersController {
  private apiService: ApiService;
  constructor() {
    this.apiService = new GitHubApiService();
  }

  public async getFollowers(req: Request, res: Response) {
    const users: User[] = await getConnection().query(
      'SELECT * FROM users WHERE github_username IS NOT NULL;',
    );
    for (const user of users) {
      let followerIds: number[] = [];

      const followers = await this.apiService.getFollowers(
        user.github_username,
      );
      followerIds = followers.map((f: Follower) => f.id);
      await getConnection().query(
        `UPDATE users SET meta = '{"follower_ids":[${followerIds}]}' WHERE id = '${user.id}'`,
      );
      if (user.meta.follower_ids.length) {
        const difference: number[] = followerIds.filter(
          (x: number) => !user.meta.follower_ids.includes(x),
        );
        if (difference.length) {
          const differenceUsers = followers.find((f: Follower) =>
            difference.includes(f.id),
          );
          EventEmitter.emit('follower', {
            telegramId: user.telegram_id,
            payload: JSON.stringify(differenceUsers, null, 2),
          });
        }
      }
    }
    return res.status(200).json('OK');
  }
}
