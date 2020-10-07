import { ProductEntity } from '../ProductEntity';
import { ProductRepository } from '../ProductRepository';

export class ListProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    const productList = await this.productRepository.findAll();
    return productList;
  }
}
