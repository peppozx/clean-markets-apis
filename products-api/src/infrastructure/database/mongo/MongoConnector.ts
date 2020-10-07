import { Db, MongoClient } from 'mongodb';

export class MongoConnector {
  private static driver: Db;

  connect(): Promise<Db> {
    return new Promise((resolve, reject) => {
      MongoClient.connect('mongodb://products-db:27017/lett-poc-products-api', (err, connection) => {
        if (err) return reject(err);
        resolve(connection.db('products-api'));
      });
    });
  }

  public static async getInstance(): Promise<Db> {
    if (!this.driver) {
      const mongoConnector = new MongoConnector();
      this.driver = await mongoConnector.connect();
    }

    return this.driver;
  }
}
