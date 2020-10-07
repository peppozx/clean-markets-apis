import { NestFactory } from '@nestjs/core';
import { AppModule } from '../infrastructure/api/nest/AppModule';
import mongoConnect from '../infrastructure/db/mongo/MongoConnector';
import cors from 'cors';

async function start() {
  await mongoConnect.connect();
  await mongoConnect.createClientsCollection();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3333);
}

start();
