import {UserContext} from "./types/ctx.type";

export const wrapper = (handler: (ctx:UserContext) => Promise<string>) => async (ctx: UserContext) => {
    const res = await handler(ctx);
    ctx.reply(res);
}