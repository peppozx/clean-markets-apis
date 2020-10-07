import { IOrdersRepository } from '../../../../../domain/orders/repositories/IOrdersReposity';
import { Order } from '../../../../../domain/orders/entities/Order';
import { Collection, ObjectId } from 'mongodb'

export class MongoOrdersRepository implements IOrdersRepository {
    private collection: Collection;

    constructor(mongoClient: any) {
        this.collection = mongoClient.collection('orders');
    }

    async createOrder(order: Order): Promise<Order[]> {
        const orderToCreate = new Order(order.products, order.userId+'');
        const { ops } = await this.collection.insertOne(orderToCreate);
        return [new Order(ops[0].products, ops[0].userId, ops[0]._id)];
    }

    async getOrders(): Promise<Order[]> {
        const orders = await this.collection.find({}).toArray();
        return orders.map(o => new Order(o.products, o.userId, o._id));
    }

    async getOrderByClientId(clientId: string): Promise<Order[]> {
        const searchOrders = await this.collection.find({ userId: clientId }).toArray();
        return searchOrders.map(o => new Order(o.products, o.userId, o._id));
    }

    async getOrderById(orderId: string): Promise<Order[]> {
        const searchOrders = await this.collection.find({ _id: new ObjectId(orderId) }).toArray();
        return searchOrders.map(o => new Order(o.products, o.userId, o._id));
    }
}