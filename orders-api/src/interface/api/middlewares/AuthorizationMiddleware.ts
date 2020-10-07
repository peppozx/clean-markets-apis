import { NestMiddleware, Injectable } from '@nestjs/common';
import AppError, { AppErrorType } from '../../../domain/shared/AppError';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import AxiosOrdersClient from '../../../infrastructure/api/nest/clients/AxiosOrdersClient';
const errorHandler = new ErrorHandler('authorization-middleware');

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
      private readonly ordersClient: AxiosOrdersClient,
  ) {}

  async use(request: Request, res: Response, next: NextFunction) {
    const token = request.headers.authorization;
    if (!token) {
      const err = new AppError(
        AppErrorType.UNAUTHORIZED,
        'Missing Authorization header'
      );
      const response = errorHandler.handle(err, console);
      return res.status(response.statusCode).json(response.body);
    }

    const clients = await this.ordersClient.getClients();
    const [currentClient] = clients.filter(c => c.token === token);
    if (!currentClient) return res.status(401).json({ message: 'Invalid token'});

    request.currentClient = currentClient;

    return next();
  }
}
