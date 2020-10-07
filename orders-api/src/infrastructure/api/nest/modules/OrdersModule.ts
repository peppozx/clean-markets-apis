import { Module } from '@nestjs/common';

/* Controllers */
import { OrdersController } from '../../../../interface/api/controllers/clients/OrdersController'
/* End Controllers */

/* Services */
import { CreateOrderService } from '../../../../domain/orders/useCases/createOrderService/CreateOrderService';
import { GetOrdersByClientIdService } from '../../../../domain/orders/useCases/getOrdersByClientIdService/GetOrdersByClientIdService';
import { GetOrderByIdService } from '../../../../domain/orders/useCases/getOrderByIdService/GetOrderByIdService';
import { GetOrdersService } from '../../../../domain/orders/useCases/getOrdersService/GetOrdersService';

/* End Services */

/* Clients */
import { FakeOrdersClient } from '../../../../domain/orders/clients/FakeOrdersClient';
import AxiosOrdersClient from '../clients/AxiosOrdersClient';
/* End Clients */

/* Repositories */
import { FakeOrdersRepository } from '../../../../domain/orders/repositories/FakeOrdersRepository';
import { MongoOrdersRepository } from '../../../../infrastructure/db/mongo/repositories/orders/MongoOrdersRepository';
/* End Repositories */

/* Db */
import mongoConnector from '../../../db/mongo/MongoConnector';
/* End Db */

/* Utils */
import Validator from '../../../../interface/api/validator/Validator';
/* End Utils */

@Module({
    controllers: [OrdersController],
    providers: [
        {
            provide: FakeOrdersClient,
            useFactory: () => {
                return new FakeOrdersClient();
            }
        },
        {
            provide: FakeOrdersRepository,
            useFactory: () => {
                return new FakeOrdersRepository();
            }
        },
        {
            provide: Validator,
            useFactory: () => {
                return new Validator();
            }
        },
        {
            provide: AxiosOrdersClient,
            useFactory: () => {
                return new AxiosOrdersClient();
            }
        },
        {
            provide: MongoOrdersRepository,
            useFactory: () => {
                return new MongoOrdersRepository(mongoConnector.mongo());
            }
        },
        {
            provide: CreateOrderService,
            useFactory: (validator: Validator, ordersClient: AxiosOrdersClient, ordersRepository: MongoOrdersRepository) => {
                return new CreateOrderService(validator, ordersClient, ordersRepository);
            },
            inject: [Validator, AxiosOrdersClient, MongoOrdersRepository]
        },
        {
            provide: GetOrdersByClientIdService,
            useFactory: (validator: Validator, ordersRepository: MongoOrdersRepository) => {
                return new GetOrdersByClientIdService(validator, ordersRepository);
            },
            inject: [Validator, MongoOrdersRepository]
        },
        {
            provide: GetOrderByIdService,
            useFactory: (validator: Validator, ordersRepository: MongoOrdersRepository) => {
                return new GetOrderByIdService(validator, ordersRepository);
            },
            inject: [Validator, MongoOrdersRepository],
        },
        {
            provide: GetOrdersService,
            useFactory: (validator: Validator, ordersRepository: MongoOrdersRepository) => {
                return new GetOrdersService(validator, ordersRepository);
            },
            inject: [Validator, MongoOrdersRepository],
        }
    ],
    exports: [AxiosOrdersClient],
})
export class OrdersModule { }