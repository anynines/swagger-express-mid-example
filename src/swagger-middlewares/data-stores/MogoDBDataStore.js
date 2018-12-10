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
      console.log('-------------------- collection', collection);

      dbCollection
        .find()
        .then((data) => {
          console.log('zzzzzzzzzzzzzzZZZZZZZZZZZ data', data);
          const resource = new Resource(collection, data);
          console.log('zzzzzzzzzzzzzzZZZZZZZZZZZ resource', resource);

          callback(null, resource);
        })
        .catch((e) => {
          console.log('ZZZZZZZZZZZZZZZZZZZZZZZ', e);
          callback(e);
        });
    } catch (e) {
      console.log('YYYYYYYYYYYYYYYYYYY', e);
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
