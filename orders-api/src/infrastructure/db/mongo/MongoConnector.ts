import { MongoClient } from 'mongodb';

class MongoConnect {
    private client: any;

    constructor() {
        this.client = null;
    }

    connect() {
        const self = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://orders-db:27017/lett-poc-order-api", function(err, db) {
                if (err) return reject(err);
                self.client = db.db('orders');
                resolve(db);
            });
        });
    }

    async createClientsCollection() {
        try {
            await this.client.createCollection('orders');
        } catch (err) {
            console.warn('Skipping collection creation. Already exists');
        }
        this.client.collection('orders').deleteMany({});
    }

    mongo() {
        return this.client;
    }
}

export default new MongoConnect();