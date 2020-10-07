import { Module } from '@nestjs/common';

/* Controllers */
import { ClientsController } from '../../../../interface/api/controllers/clients/ClientsController'
/* End Controllers */

/* Services */
import { CreateClientsService } from '../../../../domain/clients/useCases/createClientsService/CreateClientsService';
import { GetClientsService } from '../../../../domain/clients/useCases/getClientsService/GetClientsService'
/* End Services */

/* Repositories */
import { FakeClientsRepository } from '../../../../domain/clients/repositories/FakeClientsRepository';
import { MongoClientsRepository } from '../../../db/mongo/repositories/clients/MongoClientsRepository';
/* End Repositories */

/* Databases */
import mongoConnector from '../../../db/mongo/MongoConnector';
/* End Databases */

/* Utils */
import Validator from '../../../../interface/api/validator/Validator';
import IValidator from '../../../../interface/api/validator/IValidator';
/* End Utils */

@Module({
    controllers: [ClientsController],
    providers: [
        {
            provide: Validator,
            useFactory: () => {
                return new Validator();
            }
        },
        {
            provide: FakeClientsRepository,
            useFactory: () => {
                return new FakeClientsRepository();
            }
        },
        {
            provide: MongoClientsRepository,
            useFactory: () => {
                return new MongoClientsRepository(mongoConnector.mongo());
            }
        },
        {
            provide: CreateClientsService,
            useFactory: (fakeClientsRepository: FakeClientsRepository, validator: IValidator) => {
                return new CreateClientsService(validator, fakeClientsRepository);
            },
            inject: [MongoClientsRepository, Validator],
        },
        {
            provide: GetClientsService,
            useFactory: (fakeClientsRepository: FakeClientsRepository, validator: IValidator) => {
                return new GetClientsService(validator, fakeClientsRepository);
            },
            inject: [MongoClientsRepository, Validator],
        }
    ],
    exports: [],
})
export class ClientsModule { }