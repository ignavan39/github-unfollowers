import {Request, Response} from "express";

export class FollowerController {
    public getFollowers(req: Request,res: Response){
       return res.status(200).json('OK');
    }
}