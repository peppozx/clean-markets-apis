import { IClientsRepository } from "../../repositories/IClientsRepository";
import { Client } from '../../entities/Client';
import IValidator from "../../../../interface/api/validator/IValidator";
import AppError, { AppErrorType } from "../../../shared/AppError";

export class CreateClientsService {
    constructor(
        private readonly validator: IValidator,
        private readonly clientsRepository: IClientsRepository,
    ) { }

    async execute(newClient: Client): Promise<Client> {
        const alreadyExists = await this.clientsRepository.getClient(newClient);
        if (alreadyExists && alreadyExists.length) {
            throw new AppError(
                AppErrorType.VALIDATION,
                'Client already exists',
            )
        }
        const createdClient = await this.clientsRepository.createClient(newClient);
        return createdClient;
    }

    validate(newClient: Client): void {
        const { name, email } = newClient;
        this.validator.validate(
            {
                name,
                email,
            },
            {
                name: {
                    type: 'string',
                    required: true,
                },
                email: {
                    type: 'string',
                    required: true,
                }
            }
        )
    }
}