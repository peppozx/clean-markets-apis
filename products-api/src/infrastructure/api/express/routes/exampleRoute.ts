import { Application, Request, Response } from 'express';

export const exampleRoute = (app: Application): void => {
  app.get('/example', (request: Request, response: Response): void => {
    const { name } = request.params;
    response.status(200).json({
      message: `Hello ${name}`,
    });
  });
};
