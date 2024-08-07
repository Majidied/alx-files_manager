import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus() {
    return { redis: redisClient.isAlive(), db: dbClient.isAlive() };
  }

  static getStats() {
    return { users: dbClient.nbUsers(), files: dbClient.nbFiles() };
  }
}

export default AppController;
