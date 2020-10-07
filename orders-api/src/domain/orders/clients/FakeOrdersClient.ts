import { IOrdersClient } from './IOrdersClient';
import { Client } from '../../clients/entities/Client';
import { Product } from '../../products/entities/Product';

export class FakeOrdersClient implements IOrdersClient {
    private clients: Client[] = [];
    private products: Product[] = [];
    private id: number = 0;

    constructor() {
        this.initializeClientsAndProducts();
    }

    async getClients(): Promise<Client[]> {
        return this.clients;
    }

    async getProducts(): Promise<Product[]> {
        return this.products;
    }

    private initializeClientsAndProducts() {
        const clientsNames = ['client1', 'client2', 'client3'];
        const productNames = ['product1', 'product2', 'product3'];

        this.clients = clientsNames.map(name => new Client(name, `${name}@email.com`, `${name}_${name}@email.com`, `${this.id++}`));
        this.products = productNames.map(name => new Product(name, `${name}_description`, Math.random(), `${this.id++}`));
    }
}