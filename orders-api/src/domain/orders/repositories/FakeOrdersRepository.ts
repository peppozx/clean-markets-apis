import { Order } from '../entities/Order';
import { IOrdersRepository } from './IOrdersReposity'

export class FakeOrdersRepository implements IOrdersRepository {
  private id = 0;
  private orders: Order[] = [];

  async createOrder(order: Order): Promise<Order[]> {
      this.orders.push(new Order(order.products, order.userId+'', (++this.id)+''));
      return [order];
  }

  async getOrderByClientId(clientId: string): Promise<Order[]> {
      return this.orders.filter(o => o.userId+'' === clientId+'');
  }

  async getOrders(): Promise<Order[]> {
      return this.orders;
  }

  async getOrderById(orderId: string): Promise<Order[]> {
      return this.orders.filter(o => o.orderId === orderId);
  }
}
