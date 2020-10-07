const { MongoDB } = require("./MongoDB");

const getMongoCollection = async (collectionName) => {
    const mongoDBInstance = await MongoDB.getInstance();

    return mongoDBInstance.collection(collectionName);
}

module.exports = {
    getMongoCollection
}