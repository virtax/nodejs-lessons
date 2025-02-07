import getLogger from "../utils/logger";
import { createClient, RedisClientType } from 'redis';

const logger = getLogger("redis");
const TTL = 120; // 120 sec

export class RedisService {

  public client: RedisClientType;

  async connect(): Promise<RedisClientType> {
    try {
      this.client = await createClient({
        url: process.env['REDIS_URL'],
      });
      this.client.connect();
      logger.log("Connected to Redis");
      return this.client;
    } catch (error) {
      logger.error("Failed to connect to Redis", error);
      throw error;
    }
  }

  async getCache(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async setCache(key: string, value: string ): Promise<string> {
    return await this.client.setEx(key, TTL, value);
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      logger.log("Disconnected from Redis");
    } catch (error) {
      logger.error("Failed to disconnect from Redis", error);
    }
  }
}
export const redisService = new RedisService();
const db = await redisService.connect();

