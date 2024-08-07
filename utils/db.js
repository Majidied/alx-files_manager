import { MongoClient } from 'mongodb';

/**
 * Represents a database client for interacting with MongoDB.
 */
class DBClient {
  constructor() {
    const url = `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/`;
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        this.db = this.client.db(process.env.DB_DATABASE || 'files_manager');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
     * Checks if the database client is alive.
     * @returns {boolean} True if the client is alive, false otherwise.
     */
  isAlive() {
    return !!this.client;
  }

  /**
     * Retrieves the number of users in the database.
     * @returns {Promise<number>} A promise that resolves to the number of users.
     */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  /**
     * Retrieves the number of files in the database.
     * @returns {Promise<number>} A promise that resolves to the number of files.
     */
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
