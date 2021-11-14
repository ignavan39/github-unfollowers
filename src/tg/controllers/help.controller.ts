import { UserContext } from '../types/ctx.type';

export class HelpController {
  async start(ctx: UserContext): Promise<string> {
    try {
      const user = ctx.user;
      return `Welcome ${user.name ?? 'handsome'} 🐱`;
    } catch (e: any) {
      return e.toString();
    }
  }
}
