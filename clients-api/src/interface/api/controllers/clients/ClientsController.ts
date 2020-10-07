import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CreateClientsService } from '../../../../domain/clients/useCases/createClientsService/CreateClientsService';
import { GetClientsService } from '../../../../domain/clients/useCases/getClientsService/GetClientsService';
import { Client } from '../../../../domain/clients/entities/Client';
import ErrorHandler from '../../utils/ErrorHandler';
import { ResponseHandler, ApiResponse } from '../../utils/ResponseHandler';

const errorHandler = new ErrorHandler('clients-namespace');

@Controller('/clients')
export class ClientsController {
    constructor(
        private getClientsService: GetClientsService,
        private createClientsService: CreateClientsService,
    ) { }

    @Get()
    async getClients(
        @Res() res: any,
    ): Promise<ApiResponse> {
        try {
            this.getClientsService.validate();
            const clients = await this.getClientsService.execute();
            const response = ResponseHandler.ok(clients);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }

    @Post()
    async createClient(
        @Body() newClient: Client,
        @Res() res: any,
    ): Promise<ApiResponse> {
        try {
            this.createClientsService.validate(newClient);
            const created = await this.createClientsService.execute(newClient);
            const response = ResponseHandler.created(created);
            return res.status(response.statusCode).json(response.body);
        } catch (err) {
            const errorResponse = errorHandler.handle(err, console);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
    }
}
