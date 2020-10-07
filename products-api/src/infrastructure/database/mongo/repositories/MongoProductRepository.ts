import { Collection, Db, ObjectId } from 'mongodb';
import { CreateProductDto } from '../../../../domain/dtos/CreateProductDto';
import { ProductRepository } from '../../../../domain/ProductRepository';
import { ProductEntity } from '../../../../domain/ProductEntity';

interface MongoProductData {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
}

export class MongoProductRepository implements ProductRepository {
  private collection: Collection<MongoProductData>;

  constructor(driver: Db) {
    this.collection = driver.collection('products');
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { name, description, price } = createProductDto;

    const mongoProductData = await this.collection.insertOne({
      name,
      description,
      price,
    });

    return new ProductEntity(
      mongoProductData.insertedId.toHexString(),
      name,
      description,
      price
    );
  }

  async findAll(): Promise<ProductEntity[]> {
    const mongoProductDataList = await this.collection.find().toArray();

    return mongoProductDataList.map(
      (mongoProduct) =>
        new ProductEntity(
          mongoProduct._id.toHexString(),
          mongoProduct.name,
          mongoProduct.description,
          mongoProduct.price
        )
    );
  }

  async findById(id: string): Promise<ProductEntity | undefined> {
    if (ObjectId.isValid(id)) {
      const mongoProductData = await this.collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });
  
      return mongoProductData
        ? new ProductEntity(
            mongoProductData._id.toHexString(),
            mongoProductData.name,
            mongoProductData.description,
            mongoProductData.price
          )
        : undefined;
    } else {
      return undefined;
    }
  }
}
