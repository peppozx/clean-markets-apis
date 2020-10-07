import { CreateProductDto } from '../dtos/CreateProductDto';
import { ProductEntity } from '../ProductEntity';
import { ProductRepository } from '../ProductRepository';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create(createProductDto);
    return product;
  }
}
