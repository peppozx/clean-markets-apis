import { Client } from '../../clients/entities/Client';
import { Product } from '../../products/entities/Product';

export interface IOrdersClient {
    getClients(): Promise<Client[]>;
    getProducts(): Promise<Product[]>;
}
