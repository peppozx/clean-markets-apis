import { Order } from '../entities/Order';

export interface IOrdersRepository {
    createOrder(order: Order): Promise<Order[]>;
    getOrders(): Promise<Order[]>;
    getOrderByClientId(clientId: string): Promise<Order[]>;
    getOrderById(orderId: string): Promise<Order[]>;
}