'use strict'
var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var validator = require('express-validator');

//Import controllers which hold the CRUD methods for each model
var artworksController = require('./db/controllers/artworks');
var artistsController = require('./db/controllers/artists');
var locationsController = require('./db/controllers/locations');
var tutorialsController = require('./db/controllers/tutorials');

//Instantiate app Name and globals
var appName = "api-crud-orm-sequelize-cors deploy1->stg V1.2.2 01-23-2021";

//Instantiate Express
var app = express();

//Cors
app.use(cors());

//Set up body-parser with JSON
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
app.use(bodyParser.json());

//Initialize express-validator to check incoming POST request values.
app.use(validator());


//Import the Sequelize models. We import the whole folder, so Node will pull in index.js, which is where the connection to
//sequelize is made.
var models = require("./db/models");

//===========================================
// Route Handlers
//===========================================
//Basic home route with documentation. Just for presentation, not functional.
app.get('/', function(req, res, next){
  let ret = `<p>Home Route - Go to github1 : <a href=https://github.com/ivanchenoweth/api-crud-orm-sequelize-cors target="_blank"> ${appName}<a></p>`;
  ret = ret+`<p>Home Route - Endpoint2 : <a href=https://github.com/ivanchenoweth/api-crud-orm-sequelize-cors target="_blank"> ${appName}<a></p>`;
  res.send(ret);
  //res.send(`Home Route - Endpoint : <a href=https://github.com/ivanchenoweth/api-crud-orm-sequelize-cors target="_blank"> ${appName}<a>`);
});

//API endpoints and CRUD routes. The second arguments are referring to functions defined in the individual controller files.
//Artworks CRUD routes.
app.get('/api/v1/artworks', artworksController.fetchAll);
app.get('/api/v1/artworks/:id', artworksController.fetchOne);
app.post('/api/v1/artworks/', artworksController.create);
app.put('/api/v1/artworks/:id', artworksController.update);
app.delete('/api/v1/artworks/:id', artworksController.delete);


//Artists CRUD routes.
app.get('/api/v1/artists', artistsController.fetchAll);
app.get('/api/v1/artists/:id', artistsController.fetchOne);
app.post('/api/v1/artists/', artistsController.create);
app.put('/api/v1/artists/:id', artistsController.update);
app.delete('/api/v1/artists/:id', artistsController.delete);


//Locations CRUD routes.
app.get('/api/v1/locations', locationsController.fetchAll);
app.get('/api/v1/locations/:id', locationsController.fetchOne);
app.post('/api/v1/locations/', locationsController.create);
app.put('/api/v1/locations/:id', locationsController.update);
app.delete('/api/v1/locations/:id', locationsController.delete);

//Tutorials CRUD routes.
app.get('/api/v1/tutorials', tutorialsController.fetchAll);
app.get('/api/v1/tutorials/:id', tutorialsController.fetchOne);
app.post('/api/v1/tutorials/', tutorialsController.create);
app.put('/api/v1/tutorials/:id', tutorialsController.update);
app.delete('/api/v1/tutorials/:id', tutorialsController.delete);

//===========================================
// End of Route Handlers
//===========================================
// Catch 404 errors and forward to error handler. This is called if no match is found in the preceding route functions.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// called as the last middleware. Expects an error object as the first argument, which we pass in manually as part of the next() function
//from within the other routes. This allows us to catch and handle errors in routes.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var errorResponse = {};
  errorResponse.status = err.status;
  errorResponse.message = err.message;
  res.json(errorResponse);
});


//Tell node to listen for the App on port 3000:
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log(`Running ${appName}`);
  console.log('Express app listening on port 3000');
})




