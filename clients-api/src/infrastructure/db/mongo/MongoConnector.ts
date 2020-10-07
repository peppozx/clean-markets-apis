import { MongoClient } from 'mongodb';

class MongoConnect {
    private client: any;

    constructor() {
        this.client = null;
    }

    connect() {
        const self = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://clients-db:27017/lett-poc-client-api", function(err, db) {
                if (err) return reject(err);
                self.client = db.db('clients');
                resolve(db);
            });
        });
    }

    async createClientsCollection() {
        try {
            await this.client.createCollection('clients');
        } catch (err) {
            console.warn('Skipping collection creation. Already exists');
        }
        this.client.collection('clients').deleteMany({});
    }

    mongo() {
        return this.client;
    }
}

export default new MongoConnect();