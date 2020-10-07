import { GetClientsService } from './GetClientsService';
import { FakeClientsRepository } from '../../repositories/FakeClientsRepository';
import { Client } from '../../entities/Client';
import Validator from '../../../../interface/api/validator/Validator';

describe('GetClientsService', () => {
    let fakeClientsRepository: FakeClientsRepository;
    let getClientsService: GetClientsService;
    let validator: Validator;

    beforeEach(() => {
        fakeClientsRepository = new FakeClientsRepository();
        validator = new Validator();
        getClientsService = new GetClientsService(validator, fakeClientsRepository);
    });

    it('Should return no client', async () => {
        const client = new Client('', 'teste', 'testador@testador.com');
        const response = await fakeClientsRepository.getClient(client);
        expect(response.length).toBe(0);
    });

    it('Should return a client', async () => {
        const newClient = new Client('', 'teste', 'testador@testador.com');
        await fakeClientsRepository.createClient(newClient);
        const response = await getClientsService.execute();
        expect(response.length).toBe(1);
        const [client] = response;
        expect(client.name).toBe(newClient.name);
        expect(client.email).toBe(newClient.email);
    });
});