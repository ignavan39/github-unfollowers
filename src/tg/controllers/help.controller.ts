import logger from '../../libs/logger';
import { getConnection } from 'typeorm';
import { User } from '../../libs/types/user.type';
import { GitHubApiService } from '../../api/followers/github-api.service';

export class HelpController {
  private readonly githubApiService: GitHubApiService;
  constructor() {
    this.githubApiService = new GitHubApiService();
  }
  async start(user: User): Promise<string> {
    try {
      return `Welcome ${user.name ?? 'handsome'} 🐱`;
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.start,
      });
      throw e;
    }
  }

  async setGithubUsername(
    user: User,
    githubUsername: string | undefined,
  ): Promise<string> {
    try {
      if (!githubUsername || githubUsername.length < 1) {
        return 'Empty username :(';
      }
      await getConnection().query(
        `UPDATE users SET github_username = $1 WHERE telegram_id = $2`,
        [githubUsername, user.telegram_id],
      );
      try {
        const userInfo = await this.githubApiService.getUserInfo(
          githubUsername,
        );
        return `You are subscribed to GitHub account notifications: ${JSON.stringify(
          userInfo,
          null,
          2,
        )}`;
      } catch {
        return `User not found by ${githubUsername}`;
      }
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.setGithubUsername,
      });
      throw e;
    }
  }
}
