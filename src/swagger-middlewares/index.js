import path from 'path';
import mongoDB from '../db/mongoDB';
import MongoDBDataStore from './data-stores/MogoDBDataStore';

const swaggerFile = () => path.join(__dirname, '../specs/pets.yaml');

const DATA_STORE = () => {
  let instance;

  if (instance) {
    return instance;
  }
  instance = new MongoDBDataStore(mongoDB);
  return instance;
};

const middlewares = middleware => [
  middleware.metadata(),
  middleware.files(),
  middleware.parseRequest(),
  middleware.CORS(),
  middleware.validateRequest(),
  middleware.mock(DATA_STORE()),
];

const errorRouter = (err, _req, res, _next) => {
  res.status(err.status).json({ error: err.message, status: err.status });
};

export {
  errorRouter,
  middlewares,
  swaggerFile,
};
