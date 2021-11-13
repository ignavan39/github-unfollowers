import express, {Application} from "express";
import {FollowerRouter} from "../followers/router";
import logger from "../../common/logger";

export class AppModule {
    private readonly followerRouter: FollowerRouter;
    private readonly app: Application

    constructor() {
        this.followerRouter = new FollowerRouter();
        this.app = express();
        this.initRoutes();
    }

    public initRoutes(){
        this.app.use('/internal',this.followerRouter.router);
    }

    public async listen(): Promise<void>{
        logger.info({
            level: 'info',
            message: 'API INIT'
        })
        await this.app.listen(8000);
    }
}