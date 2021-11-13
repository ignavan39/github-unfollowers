import { Context } from 'telegraf';
import { User } from '../../types/user.type';

export interface UserContext extends Context {
  user: User;
}
