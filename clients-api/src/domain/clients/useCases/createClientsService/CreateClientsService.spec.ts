import { CreateClientsService } from './CreateClientsService';
import { FakeClientsRepository } from '../../repositories/FakeClientsRepository';
import { Client } from '../../entities/Client';
import Validator from '../../../../interface/api/validator/Validator';
import AppError from '../../../shared/AppError';

describe('CreateClientsService', () => {
    let fakeClientsRepository: FakeClientsRepository;
    let createClientsService: CreateClientsService;
    let validator: Validator;

    beforeEach(() => {
        fakeClientsRepository = new FakeClientsRepository();
        validator = new Validator();
        createClientsService = new CreateClientsService(validator, fakeClientsRepository);
    });

    it('Should be valid params', () => {
        expect(() => {
            const client = new Client('teste', 'testador@teste.com');
            createClientsService.validate(client);
        }).not.toThrow();
    });

    it('Should be invalid params', () => {
        expect(() => {
            const client = new Client('', '');
            createClientsService.validate(client);
        }).toThrow();
    });

    it('Should create a new client', async () => {
        const newClient = new Client('teste', 'testador@testador.com');
        await fakeClientsRepository.createClient(newClient);
        const [createdClient] = await fakeClientsRepository.getClient(newClient);
        expect(createdClient.name).toBe(newClient.name);
        expect(createdClient.email).toBe(newClient.email);
        expect(createdClient.token).toBe(`${newClient.name}_${newClient.email}`);
    });

    it('Should not create a new client if it already exists', async () => {
        const newClient = new Client('teste', 'testador@testador.com');
        await fakeClientsRepository.createClient(newClient);
        try {
            await createClientsService.execute(newClient);
            expect(1).toBe(2);
        } catch (err) {
            expect(err).toBeInstanceOf(AppError);
        }
    });
});