import { Client } from '../entities/Client';

export interface IClientsRepository {
    getClients(): Promise<Client[]>;
    createClient(newClient: Client): Promise<Client>;
    getClient(client: Client): Promise<Client[]>;
}