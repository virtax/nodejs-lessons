import mongoose from 'mongoose';
import config from "config";
import getLogger from "../utils/logger";
import { Mongoose } from 'mongoose';
const logger = getLogger("db");

export class DatabaseService {
  private uri: string;
  private dbName: string;
  private client: Mongoose;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async connect(): Promise<Mongoose> {
    try {
      this.client = await mongoose.connect(this.uri, { dbName: this.dbName });
      logger.log("Connected to MongoDB");
      return this.client;
    } catch (error) {
      logger.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      logger.log("Disconnected from MongoDB");
    } catch (error) {
      logger.error("Failed to disconnect from MongoDB", error);
    }
  }
}
const databaseUrl = config.get("database.url");

export const databaseService = new DatabaseService(databaseUrl, "mydatabase");
const db = await databaseService.connect();
