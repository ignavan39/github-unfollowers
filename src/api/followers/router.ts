import PromiseRouter from "express-promise-router";
import {FollowerController} from "./controller";
import logger from '../../common/logger';

export class FollowerRouter {
    public readonly router;
    private readonly controller;

    constructor() {
        this.router = PromiseRouter();
        this.controller = new FollowerController();
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