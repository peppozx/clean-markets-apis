import { Product } from '../../products/entities/Product';

export class Order {
    userId?: string;
    orderId?: string;
    products: Product[];
    constructor(
        products: Product[],
        userId: string,
        orderId?: string,
    ) {
        this.products = products;
        this.userId = userId;
        this.orderId = orderId;
    }
}
