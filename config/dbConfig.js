const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  db: process.env.DB_COLLECTION,
};

module.exports = dbConfig;