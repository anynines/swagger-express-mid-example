'use strict';
/**************************************************************************************************
 * This sample demonstrates a few more advanced features of Swagger-Express-Middleware,
 * such as setting a few options, initializing the mock data store, and adding custom middleware logic.
 **************************************************************************************************/

const util = require('util');
const path = require('path');
const express = require('express');
const swagger = require('swagger-express-middleware');
const Middleware = swagger.Middleware;
const MemoryDataStore = swagger.MemoryDataStore;
const Resource = swagger.Resource;

let app = express();
let middleware = new Middleware(app);

// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(__dirname, 'spec.yaml');
middleware.init(swaggerFile, (err) => {

  // Create a custom data store with some initial mock data
  let myDB = new MemoryDataStore();
  myDB.save(
    new Resource('/pets/Snoopy', { name: 'Snoopy', type: 'dog', tags: ['black', 'white']})
  );

  app.use(middleware.metadata());
  app.use(middleware.files());
  app.use(middleware.parseRequest());

  // These two middleware don't have any options (yet)
  app.use(
    middleware.CORS(),
    middleware.validateRequest()
  );

  // Add custom middleware
  app.get('/pets', (req, res, next) => {
    if (process.env.MOCK === 'true') {
      res.status(200).json([]);
    }
    else {
      //respond like specified in the swagger spec
      next();
    }
  });

  // The mock middleware will use our custom data store,
  // which we already pre-populated with mock data
  app.use(middleware.mock(myDB));

  app.listen(8000, () => {
    console.log('The Swagger Pet Store is now running at http://localhost:8000');
  });
});