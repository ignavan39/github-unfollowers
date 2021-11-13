export type Follower = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type User = {
  id: string;
  name?: string | null;
  telegram_id: number;
  github_username: string;
  created_at: Date;
  updated_at: Date;
  meta: {
    follower_ids: [],
  };
};

export type UserDto = Pick<User, 'telegram_id' | 'name'>;
