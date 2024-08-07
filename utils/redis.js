import createClient from 'redis/lib/createClient';
import { promisify } from 'util';

/**
 * Represents a Redis client.
 */
class RedisClient {
  constructor() {
    this.client = createClient().on('error', (error) => {
      console.log(error.message);
    });
  }

  /**
     * Checks if the Redis client is alive and connected.
     * @returns {boolean} True if the client is connected, false otherwise.
     */
  isAlive() {
    return this.client.connected;
  }

  /**
     * Retrieves the value associated with the given key from Redis.
     * @param {string} key - The key to retrieve the value for.
     * @returns {Promise<string|null>} A promise that resolves to the value,
     * or null if the key does not exist.
     */
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  /**
     * Sets the value for the given key in Redis.
     * @param {string} key - The key to set the value for.
     * @param {string} value - The value to set.
     * @param {number} duration - The duration in seconds for which
     * the value should be stored.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value, 'EX', duration);
  }

  /**
     * Deletes the value associated with the given key from Redis.
     * @param {string} key - The key to delete.
     * @returns {Promise<void>} A promise that resolves when
     * the value is deleted.
     */
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

module.exports.redisClient = new RedisClient();
