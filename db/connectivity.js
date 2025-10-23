const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig.js");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  try {
    // const connectionString = process.env.NODE_ENV === 'local' ? dbConfig.localdb : dbConfig.db;
   console.log(dbConfig.db,'dbConfig.db');
   
    await mongoose.connect(dbConfig.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // connectTimeoutMS: 30000,
      // serverSelectionTimeoutMS: 30000
    });

    console.log("MongoDb Connected....");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
