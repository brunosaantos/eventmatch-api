'use strict';

const restify     = require('restify');
const db          = require('./models');
const api         = require('./api');
const verifyToken = require('./config/verifyToken');

// import devSeeds from './seeds/dev';

const server = restify.createServer({
  name: 'EventMatch'
});

// Using bodyparser for POST Request Parameters
server.use(restify.bodyParser());

// Using queryparser for query parameters
server.use(restify.queryParser());

// CORS
server.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  return next();
});

function corsHandler(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Cache-Control, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-Access-Token, X-PINGOTHER, X-CSRF-Token');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  res.setHeader('Access-Control-Max-Age', '1000');

  return next();
}

function optionsRoute(req, res, next) {
  res.send(200);
  return next();
}

server.opts('/\.*/', corsHandler, optionsRoute);

// Unprotected routes goes here:
server.post('/api/login', api.login.post);
server.post('/api/users', api.user.post);

// Verify JWT
server.use(verifyToken);

// Protected routes goes here:
server.get('/api/verifyToken', function(req, res, next) {
  res.send(true);
  return next();
});

server.get('/api/user/:id', api.user.getOne);
server.get('/api/users', api.user.get);
server.put('/api/user/:id', api.user.put);
server.del('/api/user/:id', api.user.del);
server.post('/api/user/:id/changePassword', api.user.changePassword);

server.get('/api/events', api.events.get);
server.get('/api/events/:id', api.events.getOne);
server.post('/api/events', api.events.post);
server.post('/api/events/:id/users', api.events.registerUser);
server.put('/api/events/:id', api.events.put);
server.del('/api/events/:id', api.events.del);


// Creating Tables or Initiating Connections
db
  .sequelize
  .sync({force: false})
  .then(() => {
    // devSeeds(db);
    // Listening in 3030 Port
    server.listen(3030);
  });

export default {
  server,
  db
};
