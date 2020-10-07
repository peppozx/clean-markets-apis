import { IClientsRepository } from '../../../../../domain/clients/repositories/IClientsRepository';
import { Client } from '../../../../../domain/clients/entities/Client';
import { Collection } from 'mongodb'

export class MongoClientsRepository implements IClientsRepository {
    private collection: Collection;

    constructor(mongoClient: any) {
        this.collection = mongoClient.collection('clients');
    }

    async getClient(client: Client): Promise<Client[]> {
        const searchClient = await this.collection.findOne({ email: client.email });
        if (searchClient) {
            return [new Client(searchClient.nome, searchClient.email, searchClient.token, searchClient._id)];
        }
        return [];
    }

    async getClients(): Promise<Client[]> {
        const clients = await this.collection.find({}).toArray();
        return clients.map(c => new Client(c.name, c.email, c.token, c._id));

    }

    async createClient(newClient: Client): Promise<Client> {
        const client = new Client(newClient.name, newClient.email, `${newClient.name}_${newClient.email}`);
        const { ops } = await this.collection.insertOne(client);
        return new Client(ops[0].name, ops[0].email, ops[0].token, ops[0]._id);
    }
}