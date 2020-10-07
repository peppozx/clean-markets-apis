const {After, Before} = require('cucumber');
const { ObjectID } = require('mongodb');
const {getMongoCollection} = require('../../data/getMongoCollection');

Before({tags: "@products-seeder"}, async function() {
    const collection = await getMongoCollection('products');
    await collection.insertMany([
        {
            _id: new ObjectID('5f7dff12203ac20209211428'),
            name: "Toddy",
            description: "Nescau melhor que Toddy",
            price: 1000
        },
        {
            _id: new ObjectID('5f7dff4dbc994c7c05f777b2'),
            name: "Achocolatado",
            description: "Descrição do achocolatado",
            price: 700   
        }
    ]);
});

After({tags: "@products-truncate"}, async function() {
    const collection = await getMongoCollection('products');
    await collection.drop();
});