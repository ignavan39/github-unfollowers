import { TgModule } from './tg/app';
import { AppModule as ApiModule } from './api/app/app.module';
import { createOrmConnection } from './libs/database';

try {
  (async () => {
    createOrmConnection();
    const tg = new TgModule();
    tg.init();
    const api = new ApiModule();
    api.listen();
  })();
} catch (e) {
  process.exit(1);
}
