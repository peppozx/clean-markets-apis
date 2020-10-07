import { CreateOrderService } from './CreateOrderService';
import { FakeOrdersRepository } from '../../repositories/FakeOrdersRepository';
import { FakeOrdersClient } from '../../clients/FakeOrdersClient';
import { CreateOrderDTO } from '../../../../interface/api/controllers/clients/dtos/CreateOrderDTO';
import Validator from '../../../../interface/api/validator/Validator';
import { Client } from '../../../../domain/clients/entities/Client';
import AppError from '../../../../domain/shared/AppError';

describe('CreateOrderService', () => {
    let fakeOrdersRepository: FakeOrdersRepository;
    let fakeOrdersClient: FakeOrdersClient;
    let createOrderService: CreateOrderService;
    let validator: Validator;
    let currentClient: Client;

    beforeEach(() => {
        fakeOrdersRepository = new FakeOrdersRepository();
        fakeOrdersClient = new FakeOrdersClient();
        validator = new Validator();
        currentClient = new Client('client1', 'client1@email.com', 'client1_client1@email.com', '0');
        createOrderService = new CreateOrderService(validator, fakeOrdersClient, fakeOrdersRepository);
    });

    it('Should be valid params', () => {
        expect(() => {
            const createOrderDTO = new CreateOrderDTO('123', 2);
            createOrderService.validate([ { productId: createOrderDTO.productId, quantity: createOrderDTO.quantity }]);
        }).not.toThrow();
    });

    it('Should be invalid params', () => {
        expect(() => {
            const createOrderDTO = new CreateOrderDTO('', 3);
            createOrderService.validate([createOrderDTO]);
        }).toThrow();
    });

    it('Should create a new order', async () => {
        const createOrderDTO = new CreateOrderDTO('3', 3);
        await createOrderService.validate([{ productId: createOrderDTO.productId, quantity: createOrderDTO.quantity }]);
        const [createdOrder] = await createOrderService.execute(currentClient, [createOrderDTO]);
        expect(createdOrder).toBeDefined();
        expect(createdOrder.orderId).toBe('1');
        expect(createdOrder.userId).toBe(currentClient.id);
    });

    it('Should not create a new order because product id does not exist', async () => {
        const createOrderDTO = new CreateOrderDTO('0', 3);
        await createOrderService.validate([{ productId: createOrderDTO.productId, quantity: createOrderDTO.quantity }]);
        try {
            await createOrderService.execute(currentClient, [createOrderDTO]);
            expect(1).toBe(2);
        } catch (err) {
            expect(err).toBeInstanceOf(AppError);
        }
    });
});
