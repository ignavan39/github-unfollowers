import {Request, Response} from "express";
import { EventEmitter } from '../../common/event-emitter';
import { User } from '../../types/user.type';
import { getConnection } from 'typeorm';

export class FollowerController {
    public async getFollowers(req: Request,res: Response){
       const users: User[] = await getConnection().query('SELECT * FROM users');
       for(let user of users){
         EventEmitter.emit('follower',{telegramId: user.telegram_id,msg:'OK'})
       }
       return res.status(200).json('OK');
    }
}