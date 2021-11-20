import { UserContext } from '../types/ctx.type';
import logger from '../../libs/logger';
import { getConnection } from 'typeorm';
import { User } from '../../types/user.type';

export class HelpController {
  async start(user: User): Promise<string> {
    try {
      return `Welcome ${user.name ?? 'handsome'} 🐱`;
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.start,
      })
      throw e;
    }
  }

  async setGithubUsername(user: User, githubUsername: string | undefined) : Promise<string> {
    try {
        if(!githubUsername){
          return 'Empty username :(';
        }
        await getConnection().query(`UPDATE users SET github_username = $1 WHERE telegram_id = $2`,[githubUsername,user.telegram_id]);
        return `Hello ${githubUsername} !`;
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.setGithubUsername,
      })
      throw e;
    }
  }
}
