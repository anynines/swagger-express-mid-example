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
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/mockers');

let app = express();
let middleware = new Middleware(app);

// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(__dirname, 'spec.yaml');
middleware.init(swaggerFile, (err) => {

  // // Create a custom data store with some initial mock data
  let myDB = new MemoryDataStore();
  myDB.save(
    new Resource('/pets/Snoopy', { name: 'Snoopy', type: 'dog', tags: ['black', 'white', 'purple', 'yellow'] })
  );
  // Make our db accessible to our router
  app.use(function (req, res, next) {
    req.db = db;
    next();
  });

  app.use(
    middleware.metadata(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.CORS(),
    middleware.validateRequest()
  );

  // Add custom middleware
  app.get('/rifability/vin', (req, res, next) => {
    console.log('tmp xxxxxxxxxxxxxxxxxxxxx')
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
  app.use((err, req, res, next) => {
    res.status(err.status);
    res.type('html');
    res.send(util.format('<html><body><h1>%d Error!</h1><p>%s</p></body></html>', err.status, err.message));
  });

  app.listen(8000, () => {
    console.log('The Swagger Pet Store is now running at http://localhost:8000');
  });
});
