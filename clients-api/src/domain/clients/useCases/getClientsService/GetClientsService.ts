import { IClientsRepository } from "../../repositories/IClientsRepository";
import { Client } from '../../entities/Client';

export class GetClientsService {
    constructor(
        private readonly validator: any,
        private readonly clientsRepository: IClientsRepository,
    ) { }

    async execute(): Promise<Client[]> {
        return await this.clientsRepository.getClients();
    }

    validate(): void {
        this.validator.validate({}, {});
    }
}