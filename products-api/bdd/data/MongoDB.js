const { MongoClient } = require('mongodb')
const { mongoURI, mongoDatabase } = require('../config');

class MongoDB {
    static database;

    connect (databaseName) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, connection) => {
                if (err) return reject(err);
                const database = connection.db(databaseName);
                resolve(database);
            });
        });
    }

    static async getInstance () {
        if(!MongoDB.database) {
            const mongoDB = new MongoDB();
            MongoDB.database = await mongoDB.connect(mongoDatabase);
        };
    
        return MongoDB.database;
    }

}

module.exports = {
    MongoDB,
}