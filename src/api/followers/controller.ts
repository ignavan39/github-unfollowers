import {Request, Response} from "express";
import { EventEmitter } from '../../common/event-emitter';
import { Follower, User } from '../../types/user.type';
import { getConnection } from 'typeorm';
import https from 'https';
import logger from '../../common/logger';

export class FollowerController {
  constructor() {
  }
    public async getFollowers(req: Request,res: Response){
      const users: User[] = await getConnection().query('SELECT * FROM users WHERE github_username IS NOT NULL;');
      for(const user of users){
        let followerIds: number[] = [];
        const options =  {
          host: 'api.github.com',
          path: '/users/' + user.github_username + '/followers?per_page=10000',
          method: 'GET',
          headers: {'user-agent': 'node.js'}
        };
        const request = https.request(options, (response) => {
          let body = '';
          response.on('data', (chunk) => {
            body += chunk.toString('utf8');
          });

          response.on('end',async () => {
            const followers = JSON.parse(body);
            followerIds = followers.map((f: Follower) => f.id);
            await getConnection().query(`UPDATE users SET meta = '{"follower_ids":[${followerIds}]}' WHERE id = '${user.id}'`)
            if(user.meta.follower_ids.length){
              // @ts-ignore
              let difference: number[] = followerIds.filter((x: number) => !user.meta.follower_ids.includes(x));
              if(difference.length){
                const differenceUsers = followers.find((f: Follower) => difference.includes(f.id))
                logger.info({
                  level: 'info',
                  message: JSON.stringify(differenceUsers),
                  events: this.getFollowers
                })
                EventEmitter.emit('follower',{telegramId: user.telegram_id, message: differenceUsers})
              }
            }
          });
        });
        request.end();
      }
       return res.status(200).json('OK');
    }
}