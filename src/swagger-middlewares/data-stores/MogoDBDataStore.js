import { DataStore, Resource } from 'swagger-express-middleware';

class MongoDBDataStore extends DataStore {
  constructor(db) {
    super();
    this.db = db;
  }

  __openDataStore(collection, callback) {
    const { db } = this;

    try {
      const dbCollection = db.get(collection);

      dbCollection
        .find()
        .then((data) => {
          const resource = new Resource(collection, data);

          callback(null, resource);
        })
        .catch((e) => {
          callback(e);
        });
    } catch (e) {
      callback(e);
    }
  }

  __saveDataStore(collection, resources, callback) {
    const { db } = this;

    const dbCollection = db.get(collection);
    dbCollection.insert(resources, callback);
  }
}

export default MongoDBDataStore;
