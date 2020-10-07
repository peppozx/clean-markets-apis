import { IOrdersClient } from "@domain/orders/clients/IOrdersClient";
import Axios, { AxiosInstance } from 'axios';
import { Client } from '../../../../domain/clients/entities/Client';
import { Product } from '../../../../domain/products/entities/Product';

export default class AxiosOrdersClient implements IOrdersClient {
    private client: AxiosInstance;

    constructor() {
        this.client = Axios.create();
    }

    async getClients(): Promise<Client[]> {
        const { data = [] } = await this.client.get('http://LETT_POC_CLIENTS_API:3333/clients');
        return data.map((client: Client) => new Client(client.name, client.email, client.token+'', client.id+''));
    }

    async getProducts(): Promise<Product[]> {
        const { data = [] } = await this.client.get('http://LETT_POC_PRODUCTS_API:3335/product');
        return data.map((product: Product) => new Product(product.name, product.description, product.price, product.id));
    }
}