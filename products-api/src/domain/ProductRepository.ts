import { CreateProductDto } from './dtos/CreateProductDto';
import { ProductEntity } from './ProductEntity';

export interface ProductRepository {
  create(createProductDto: CreateProductDto): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | undefined>;
  findAll(): Promise<ProductEntity[]>;
}
