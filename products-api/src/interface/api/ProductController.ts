import { CreateProductDto } from '../../domain/dtos/CreateProductDto';
import { CreateProductService } from '../../domain/useCases/CreateProductService';
import { FindProductService } from '../../domain/useCases/FindProductService';
import { ListProductService } from '../../domain/useCases/ListProductService';
import { Request, Response } from 'express';
import { NotFoundError } from '../../domain/errors/NotFoundError';

export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findProductService: FindProductService,
    private readonly listProductService: ListProductService
  ) {}

  async post(request: Request, response: Response): Promise<void> {
    const { name, description, price } = request.body;
    const createProductDto = new CreateProductDto(name, description, price);

    const createdProduct = await this.createProductService.execute(
      createProductDto
    );

    response.status(201).json(createdProduct);
  }

  async get(_: Request, response: Response): Promise<void> {
    const productList = await this.listProductService.execute();

    response.status(200).json(productList);
  }

  async getById(request: Request, response: Response): Promise<void> {
    try {
      const id = request.params.id;
      const product = await this.findProductService.execute(id);

      response.status(200).json(product);
    } catch (error) {
      if (error instanceof NotFoundError) {
        response.status(404).json({
          message: error.message,
        });
      } else {
        response.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
