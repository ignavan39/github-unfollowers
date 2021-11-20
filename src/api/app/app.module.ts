import express, {Application} from "express";
import { createOrmConnection } from "../../libs/database";
import logger from "../../libs/logger";
import {FollowersRouter} from "../followers/followers.router";

export class AppModule {
    private readonly followersRouter: FollowersRouter;
    private readonly app: Application

    constructor() {
        this.followersRouter = new FollowersRouter();
        this.app = express();
        this.initRoutes();
        createOrmConnection();
    }

    public initRoutes(){
        this.app.use('/internal',this.followersRouter.router);
    }

    public async listen(): Promise<void>{
        logger.info({
            level: 'info',
            message: 'API INIT'
        })
        await this.app.listen(8000);
    }
}