import { UserContext } from '../types/ctx.type';
import logger from '../../common/logger';
import { getConnection } from 'typeorm';

export class HelpController {
  async start(ctx: UserContext): Promise<string> {
    try {
      const user = ctx.user;
      return `Welcome ${user.name ?? 'handsome'} 🐱`;
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.start,
      })
      return e;
    }
  }

  async setGithubUsername(ctx: UserContext): Promise<string> {
    try {
      const user = ctx.user;
      const msg = ctx.message ?? ctx.editedMessage;
      if (msg && 'text' in msg){
        const githubUsername = msg.text;
        await getConnection().query(`UPDATE users SET github_username = $1 WHERE telegram_id = $2`,[githubUsername,user.telegram_id]);
        return `Hello ${githubUsername} !`;
      }
      return 'Error'
    } catch (e) {
      logger.error({
        level: 'error',
        message: e,
        event: this.setGithubUsername,
      })
      return e;
    }
  }
}
