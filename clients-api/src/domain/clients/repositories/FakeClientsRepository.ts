import { Client } from '../entities/Client';
import { IClientsRepository } from './IClientsRepository'

export class FakeClientsRepository implements IClientsRepository {
    private clients: Client[] = [];
    private id = 0;

    async getClients(): Promise<Client[]> {
        return this.clients;
    }

    async createClient(newClient: Client): Promise<Client> {
        const client = new Client(newClient.name, newClient.email, `${newClient.name}_${newClient.email}`, (this.id++) + '');
        this.clients.push(client);
        return client;
    }

    async getClient(client: Client): Promise<Client[]> {
        const { email } = client;
        const exists = this.clients.filter(client => client.email === email);
        return exists;
    }
}