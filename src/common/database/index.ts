import { createConnection } from 'typeorm';
import config from '../config';

export const createOrmConnection = async () => {
  const { database } = config;
  return await createConnection({
    type: 'postgres',
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.password,
    database: database.name,
  });
};
