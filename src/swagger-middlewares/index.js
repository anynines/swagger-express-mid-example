import path from 'path';

// const swaggerFile = () => path.join(__dirname, '../specs/pets.yaml');
const swaggerFile = () => path.join(__dirname, '../specs/daimler-specs.yaml');

const middlewares = middleware => [
  middleware.metadata(),
  middleware.CORS(),
  middleware.files(),
  middleware.parseRequest(),
  middleware.validateRequest(),
  middleware.mock(),
];

const errorRouter = (err, _req, res, _next) => {
  res.status(err.status).json({ error: err.message, status: err.status });
};

export {
  errorRouter,
  middlewares,
  swaggerFile,
};
