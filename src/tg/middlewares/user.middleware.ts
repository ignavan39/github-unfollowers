import { getConnection } from 'typeorm';
import { UserContext } from '../types/ctx.type';
import logger from '../../libs/logger';
import { UserDto } from '../../libs/types/user.type';

export const UserMiddleware = async (
  ctx: UserContext,
  next: () => Promise<void>,
) => {
  if (!ctx.from) {
    ctx.reply('Информация о получателе не найдена');
    logger.log({
      level: 'error',
      message: 'incorrect time',
    });
    return;
  }
  try {
    const dto: UserDto = {
      name: ctx.from.username,
      telegram_id: ctx.from.id,
    };
    const args = [dto.telegram_id?.toString()];

    if (dto.name) {
      args.push(dto.name ?? '');
    }

    const user = (
      await getConnection().query(
        `INSERT INTO users("telegram_id" ,"name") VALUES ($1,$2)
             ON CONFLICT (telegram_id) DO UPDATE SET name = $2
             RETURNING *;`,
        args,
      )
    )[0];

    ctx.user = user;
    return next();
  } catch (e: any) {
    logger.error({
      level: 'error',
      message: e,
    });
    throw e;
  }
};
