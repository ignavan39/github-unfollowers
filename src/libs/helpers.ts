import axios, { Method } from 'axios';
import { Follower } from './types/user.type';

type HttpOptions = {
  url: string;
  method: Method;
  headers: any;
};
export const getGithubFollowers = async (
  username: string,
): Promise<Follower[]> => {
  let perPage = 100;
  let page = 1;
  let url =
    'https://api.github.com/users/' +
    username +
    `/followers?per_page=${perPage}&page=${page}`;
  const options: HttpOptions = {
    url,
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
  };
  const followers: Follower[] = await request<Follower>(options);
  let hasNextPage = followers.length >= 100;
  while (hasNextPage) {
    perPage += 100;
    page++;
    url =
      'https://api.github.com/users/' +
      username +
      `/followers?per_page=${perPage}&page=${page}`;
    options.url = url;

    const nextFollowers = await request<Follower>(options);
    followers.push(...nextFollowers);
    hasNextPage = nextFollowers.length >= 100;
  }
  return followers;
};

async function request<T>(options: HttpOptions): Promise<T[]> {
  const res = await axios.get(options.url, {
    method: options.method,
    headers: options.headers,
  });
  const result: T[] = res.data;
  return result;
}
