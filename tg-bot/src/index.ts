import { AppModule } from './app';

try{
    const app = new AppModule();
    app.init();
}catch(e){
    process.exit(1);
}