import { Context } from 'telegraf';
import { User } from '../../libs/types/user.type';

export interface UserContext extends Context {
  user: User;
}
