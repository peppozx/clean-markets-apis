import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Client } from '../../../../domain/clients/entities/Client';
import { CurrentClient } from '../../../../infrastructure/api/nest/decorators/CurrentClient';
import { ResponseHandler, ApiResponse } from '../../utils/ResponseHandler';
import { CreateOrderDTO } from './dtos/CreateOrderDTO';
import ErrorHandler from '../../utils/ErrorHandler';
import { CreateOrderService } from '../../../../domain/orders/useCases/createOrderService/CreateOrderService';
import { GetOrdersByClientIdService } from '../../../../domain/orders/useCases/getOrdersByClientIdService/GetOrdersByClientIdService';
import { GetOrderByIdService } from '../../../../domain/orders/useCases/getOrderByIdService/GetOrderByIdService';
import { GetOrdersService } from '../../../../domain/orders/useCases/getOrdersService/GetOrdersService';

const errorHandler = new ErrorHandler('orders-namespace');

@Controller('/orders')
export class OrdersController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly getOrdersByClientIdService: GetOrdersByClientIdService,
        private readonly getOrderByIdService: GetOrderByIdService,
        private readonly getOrdersService: GetOrdersService,
    ) { }


    @Get('/')
    async getOrders(
        @Res() res: any,
    ) {
        try {
            this.getOrdersService.validate();
            const orders = await this.getOrdersService.execute();
            const response = ResponseHandler.ok(orders);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }

    @Get('/user/:id')
    async getOrdersByClientId(
        @Param('id') clientId: string,
        @Res() res: any,
    ) {
        try {
            this.getOrdersByClientIdService.validate(clientId);
            const orders = await this.getOrdersByClientIdService.execute(clientId);
            const response = ResponseHandler.ok(orders);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }

    @Get('/:id')
    async getOrderById(
        @Param('id') orderId: string,
        @Res() res: any,
    ) {
        try {
            this.getOrderByIdService.validate(orderId);
            const order = await this.getOrderByIdService.execute(orderId);
            const response = ResponseHandler.ok(order);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }

    @Post('/')
    async createOrder(
        @CurrentClient() currentClient: Client,
        @Body() createOrderDTO: CreateOrderDTO[],
        @Res() res: any,
    ): Promise<ApiResponse> {
        try {
            this.createOrderService.validate(createOrderDTO);
            const createdOrder = await this.createOrderService.execute(currentClient, createOrderDTO);
            const response = ResponseHandler.ok(createdOrder);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }
}
