require('dotenv').config();

module.exports = {
    apiBaseUrl: process.env.API_BASE_URL,
    mongoURI: process.env.MONGO_URI,
    mongoDatabase: process.env.MONGO_DB
}