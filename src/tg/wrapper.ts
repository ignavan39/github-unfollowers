import { User } from '../libs/types/user.type';
import { UserContext } from './types/ctx.type';

export const wrapper =
  (handler: (user: User, message?: string) => Promise<string>) =>
  async (ctx: UserContext) => {
    const msg = ctx.message ?? ctx.editedMessage;
    let text: string | undefined;
    if (msg && 'text' in msg) {
      text = msg.text;
    }
    try {
      const res = await handler(ctx.user, text);
      ctx.reply(res);
    } catch (e) {
      ctx.reply('Whooops something went wrong :(');
    }
  };
