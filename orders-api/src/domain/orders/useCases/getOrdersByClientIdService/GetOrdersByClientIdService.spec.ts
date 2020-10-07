import Validator from '../../../../interface/api/validator/Validator';
import { FakeOrdersRepository } from '../../../../domain/orders/repositories/FakeOrdersRepository';
import { GetOrdersByClientIdService } from './GetOrdersByClientIdService';
import { Order } from '../../entities/Order';
import { Product } from '../../../../domain/products/entities/Product';
import { FakeOrdersClient } from '../../../../domain/orders/clients/FakeOrdersClient';
import { Client } from '../../../../domain/clients/entities/Client';

describe('GetOrdersByClientIdService', () => {
    let fakeOrdersRepository: FakeOrdersRepository;
    let fakeOrdersClient: FakeOrdersClient;
    let validator: Validator;
    let getOrdersByClientIdService: GetOrdersByClientIdService;
    let currentUser: Client;
    let products: Product[];
    let order: Order;
    let clientId: string = '13';

    beforeEach(async () => {
        fakeOrdersRepository = new FakeOrdersRepository();
        fakeOrdersClient = new FakeOrdersClient();
        validator = new Validator();
        getOrdersByClientIdService = new GetOrdersByClientIdService(validator, fakeOrdersRepository);
        currentUser = new Client('client1', 'client1@email.com', 'client1_client1@email.com', clientId);
        products = await fakeOrdersClient.getProducts();
        order = new Order(products, currentUser.id+'');
        fakeOrdersRepository.createOrder(order);
    });

    it('Should be valid params', () => {
        expect(() => {
            const clientId = '1'
            getOrdersByClientIdService.validate(clientId);
        }).not.toThrow();
    });

    it('Should be invalid params', () => {
        expect(() => {
            const clientId = '';
            getOrdersByClientIdService.validate(clientId);
        }).toThrow();
    });

    it('Should return an order', async () => {
        getOrdersByClientIdService.validate(clientId);
        const [order] = await getOrdersByClientIdService.execute(clientId);
        expect(order).toBeDefined();
        expect(order.orderId).toBe('1');
        expect(order.userId).toBe(clientId);
        expect(order.products).toBe(products);
    });

    it('Should not return an order because client id does not exist', async () => {
        const clientId = '143';
        getOrdersByClientIdService.validate(clientId);
        const [order] = await getOrdersByClientIdService.execute(clientId);
        expect(order).toBeUndefined();
    });



    
});
