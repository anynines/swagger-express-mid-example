# swagger-express-mid-example

This repo contains an example application which makes use of the _swagger-express-mid-example_ npm module to create a mock server based on a swagger specification.

# Simple Mocks

* responds according to the examples in the _spec.yaml_ 
* simply run with `node server-simple.js`
* endpoints are available under `localhost:8000/<endpoint>` according to the _spec.yaml_


# Advanced mocks

* responds according to the examples in the _spec.yaml_
* can be overwritten to have different behaviour
* can utilize im memory database
* simply run with `node server-advanced.js`
* endpoints are available under `localhost:8000/<endpoint>` according to the _spec.yaml_
* example on how to override responses from swagger spec can be found starting at line 39 inside the _server-advanced.js_ file