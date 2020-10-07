import { Application } from 'express';
import { CreateProductService } from '../../../../domain/useCases/CreateProductService';
import { FindProductService } from '../../../../domain/useCases/FindProductService';
import { ListProductService } from '../../../../domain/useCases/ListProductService';
import { ProductController } from '../../../../interface/api/ProductController';
import { MongoConnector } from '../../../database/mongo/MongoConnector';
import { MongoProductRepository } from '../../../database/mongo/repositories/MongoProductRepository';

export const productRoutes = async (app: Application): Promise<void> => {
  const mongoDatabase = await MongoConnector.getInstance();
  const repository = new MongoProductRepository(mongoDatabase);
  const createProductService = new CreateProductService(repository);
  const findProductService = new FindProductService(repository);
  const listProductService = new ListProductService(repository);
  const controller = new ProductController(
    createProductService,
    findProductService,
    listProductService
  );

  app.get('/product', controller.get.bind(controller));
  app.get('/product/:id', controller.getById.bind(controller));
  app.post('/product', controller.post.bind(controller));
};
