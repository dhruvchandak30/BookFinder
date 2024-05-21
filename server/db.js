require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let db;

const connectToDatabase = async () => {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(uri);

    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

module.exports = connectToDatabase;
