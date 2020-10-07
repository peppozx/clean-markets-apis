import { CreateProductDto } from '../../../../domain/dtos/CreateProductDto';
import { ProductEntity } from '../../../../domain/ProductEntity';
import { ProductRepository } from '../../../../domain/ProductRepository';

export class MemoryProductRepository implements ProductRepository {
  private productList: ProductEntity[];

  constructor(productList: ProductEntity[] = []) {
    this.productList = productList;
  }

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { name, description, price } = createProductDto;

    const createdProduct = new ProductEntity(
      `${name}_${price}`,
      name,
      description,
      price
    );

    this.productList.push(createdProduct);
    return Promise.resolve(createdProduct);
  }

  findAll(): Promise<ProductEntity[]> {
    return Promise.resolve(this.productList);
  }

  findById(id: string): Promise<ProductEntity | undefined> {
    const product = this.productList.find((product) => product.id === id);
    return Promise.resolve(product);
  }
}
