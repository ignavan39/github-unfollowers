import { HttpOptions, request } from '../../libs/helpers';
import { GithubFollower } from '../../libs/types/user.type';
import { ApiService } from '../api-service.interface';

export class GitHubApiService implements ApiService {
  public async getFollowers(username: string): Promise<GithubFollower[]> {
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
    const followers: GithubFollower[] = await request<GithubFollower[]>(
      options,
    );
    let hasNextPage = followers.length >= 100;
    while (hasNextPage) {
      perPage += 100;
      page++;
      url =
        'https://api.github.com/users/' +
        username +
        `/followers?per_page=${perPage}&page=${page}`;
      options.url = url;

      const nextFollowers = await request<GithubFollower[]>(options);
      followers.push(...nextFollowers);
      hasNextPage = nextFollowers.length >= 100;
    }
    return followers;
  }

  public async getUserInfo(username: string): Promise<GithubFollower> {
    const url = 'https://api.github.com/users/' + username;
    const options: HttpOptions = {
      url,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    try {
      const userInfo: GithubFollower = await request<GithubFollower>(options);
      return userInfo;
    } catch {
      throw Error('not found');
    }
  }
}
