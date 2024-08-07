import { MongoClient } from 'mongodb';

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

  isAlive() {
    return !!this.client;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
