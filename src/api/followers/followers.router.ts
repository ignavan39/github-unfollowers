import PromiseRouter from "express-promise-router";
import logger from "../../libs/logger";
import {FollowersController} from "./followers.controller";

export class FollowersRouter {
    public readonly router;
    private readonly controller;

    constructor() {
        this.router = PromiseRouter();
        this.controller = new FollowersController();
        this.init();
    }

    public async init(){
        this.router.post('/followers',this.controller.getFollowers.bind(this))
        logger.info({
            level: 'info',
            message: '[/internal/follower] POST method'
        })
    }
}