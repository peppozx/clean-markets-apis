import { NotFoundError } from '../errors/NotFoundError';
import { ProductEntity } from '../ProductEntity';
import { ProductRepository } from '../ProductRepository';

export class FindProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado');
    }

    return product;
  }
}
