import express from 'express';
import { routes } from './routes';
import cors from 'cors';

export const expressServer = (port: number): void => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  routes.forEach((route) => route(app));

  app.listen(port, () => {
    console.log(`Api Rest server listening port ${port}`);
  });
};
