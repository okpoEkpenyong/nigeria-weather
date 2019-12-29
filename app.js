const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const townsroute = require('./routes/townsRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
  
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  
  app.use('/', townsroute);
  
   module.exports = app;