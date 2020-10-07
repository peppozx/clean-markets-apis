import { Client } from '../../../../domain/clients/entities/Client';

declare global {
  namespace Express {
    interface Request {
      currentClient?: Client;
    }
  }
}
