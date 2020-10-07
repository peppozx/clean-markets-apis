import { Order } from '../../../../domain/orders/entities/Order';
import { FakeOrdersRepository } from '../../../../domain/orders/repositories/FakeOrdersRepository';
import { Product } from '../../../../domain/products/entities/Product';
import Validator from '../../../../interface/api/validator/Validator';
import { GetOrdersService } from '../../../../domain/orders/useCases/getOrdersService/GetOrdersService';
import { FakeOrdersClient } from '../../../../domain/orders/clients/FakeOrdersClient';
import { Client } from '../../../../domain/clients/entities/Client';


describe('GetOrdersService', () => {
    let getOrdersService: GetOrdersService;
    let validator: Validator;
    let ordersRepository: FakeOrdersRepository;
    let fakeOrdersClient: FakeOrdersClient;
    let products: Product[];
    let order: Order;
    let currentClient: Client;

    beforeEach(async () => {
        validator = new Validator();
        ordersRepository = new FakeOrdersRepository();
        getOrdersService = new GetOrdersService(validator, ordersRepository);
        fakeOrdersClient = new FakeOrdersClient();
        products = await fakeOrdersClient.getProducts();
        currentClient = new Client('client1', 'client1@email.com', 'client1_client1@email.com', '123');
    });

    it('Should create and return an order', async() => {
        order = new Order(products, currentClient.id+'');
        await ordersRepository.createOrder(order);

        const [createdOrder] = await getOrdersService.execute();

        expect(createdOrder).toBeDefined();
        expect(createdOrder.orderId).toBe('1');
        expect(createdOrder.products).toBe(products);
        expect(createdOrder.userId).toBe(currentClient.id);


    });
});
