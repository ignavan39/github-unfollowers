import { UserContext } from '../types/ctx.type';

export class HelpController {
  async start(ctx: UserContext): Promise<void> {
    try {
      const user = ctx.user;
      ctx.reply(`Welcome ${user.name} 🐱`);
    } catch (e: any) {
      ctx.reply(e);
    }
  }
}
