import PromiseRouter from "express-promise-router";
import {FollowerController} from "./controller";

export class FollowerRouter {
    public readonly router;
    private readonly controller;

    constructor() {
        this.router = PromiseRouter();
        this.controller = new FollowerController();
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.post('/followers',this.controller.getFollowers.bind(this))
    }
}