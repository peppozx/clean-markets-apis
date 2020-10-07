import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrdersModule } from './modules/OrdersModule';
import { AuthorizationMiddleware } from '../../../interface/api/middlewares/AuthorizationMiddleware';

@Module({
  imports: [OrdersModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).exclude({ path: 'orders', method: RequestMethod.GET }).forRoutes('*');
  }
}
