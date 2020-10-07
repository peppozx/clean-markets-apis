import Validator from '../../../../interface/api/validator/Validator';
import { FakeOrdersRepository } from '../../../../domain/orders/repositories/FakeOrdersRepository';
import { GetOrderByIdService } from './GetOrderByIdService';
import { Order } from '../../entities/Order';
import { Product } from '../../../../domain/products/entities/Product';
import { FakeOrdersClient } from '../../../../domain/orders/clients/FakeOrdersClient';
import { Client } from '../../../../domain/clients/entities/Client';

describe('CreateOrderService', () => {
    let fakeOrdersRepository: FakeOrdersRepository;
    let fakeOrdersClient: FakeOrdersClient;
    let validator: Validator;
    let getOrderByIdService: GetOrderByIdService;
    let currentUser: Client;
    let products: Product[];
    let order: Order;

    beforeEach(async () => {
        fakeOrdersRepository = new FakeOrdersRepository();
        fakeOrdersClient = new FakeOrdersClient();
        validator = new Validator();
        getOrderByIdService = new GetOrderByIdService(validator, fakeOrdersRepository);
        currentUser = new Client('client1', 'client1@email.com', 'client1_client1@email.com', '13');
        products = await fakeOrdersClient.getProducts();
        order = new Order(products, currentUser.id+'');
        fakeOrdersRepository.createOrder(order);
    });

    it('Should be valid params', () => {
        expect(() => {
            const orderId = '1'
            getOrderByIdService.validate(orderId);
        }).not.toThrow();
    });

    it('Should be invalid params', () => {
        expect(() => {
            const orderId = '';
            getOrderByIdService.validate(orderId);
        }).toThrow();
    });

    it('Should return an order', async () => {
        const orderId = '1';
        getOrderByIdService.validate(orderId);
        const [order] = await getOrderByIdService.execute(orderId);
        expect(order).toBeDefined();
        expect(order.orderId).toBe(orderId);
        expect(order.products).toBe(products);
    });

    it('Should not return an order because orderId does not exist', async () => {
        const orderId = '2';
        getOrderByIdService.validate(orderId);
        const [order] = await getOrderByIdService.execute(orderId);
        expect(order).toBeUndefined();
    });



    
});
