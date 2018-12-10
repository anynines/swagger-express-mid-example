import express from 'express';
import { Middleware } from 'swagger-express-middleware';
import { errorRouter, middlewares, swaggerFile } from './swagger-middlewares';
// import { configureRouter } from './configure';
import { mongoDBRouter } from './db/mongoDB';

const app = express();
const middleware = new Middleware(app);

// Initialize Swagger Express Middleware with our Swagger file
middleware.init(swaggerFile(), (_err) => {
  // Make our db accessible to our router
  app.use(mongoDBRouter);

  // Add custom middleware
  // app.post('/configure', configureRouter);

  // Defines used middlewares from 'swagger-middleware-express'
  app.use([...(middlewares(middleware))]);

  // Handle errors
  app.use(errorRouter);

  app.listen(8000, () => {
    // eslint-disable-next-line no-console
    console.log('The server is now running at http://localhost:8000');
  });
});
