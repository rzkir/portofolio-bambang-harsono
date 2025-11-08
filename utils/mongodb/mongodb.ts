import mongoose from "mongoose";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_SERVER) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGO_DB_SERVER;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
    mongoose?: typeof mongoose;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(uri);
      console.log("Mongoose connected successfully");
    } catch (error) {
      console.error("Mongoose connection error:", error);
      throw error;
    }
  }
  const client = await clientPromise;
  const db = client.db();
  return { db, client };
}
