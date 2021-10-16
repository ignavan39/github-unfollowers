import { getConnection } from 'typeorm';
import { UserContext } from '../../types/ctx.type';
import { UserDto } from '../../types/user.type';
import logger from '../logger';

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
    let user = (
      await getConnection().query(
        'SELECT * FROM "users" WHERE telegram_id = $1',
        [dto.telegram_id],
      )
    )[0];

    const args = [dto.telegram_id?.toString()];

    if (dto.name) {
      args.push(dto.name);
    }

    if (!user) {
      user = (
        await getConnection().query(
          `INSERT INTO users("telegram_id" ${
            dto.name ? ',"name"' : ''
          }) VALUES ($1 ${dto.name ? ',$2' : ''}) RETURNING *`,
          args,
        )
      )[0];
    }

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
