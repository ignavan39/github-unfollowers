import { Context } from 'telegraf';
import { User } from './user.type';

export interface UserContext extends Context {
  user: User;
}
