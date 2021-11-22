import { Follower } from '../libs/types/user.type';

export interface ApiService {
  getFollowers(username: string): Promise<Follower[]>;
  getUserInfo(username: string): Promise<Follower>;
}
