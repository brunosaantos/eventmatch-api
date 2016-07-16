'use strict';

const restify     = require('restify');
const db          = require('./models');
const api         = require('./api');
const verifyToken = require('./config/verifyToken');

const server = restify.createServer({
  name: 'EventMatch',
});

// Using bodyparser for POST Request Parameters
server.use(restify.bodyParser());

// CORS
server.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  return next();
});

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



// Creating Tables or Initiating Connections
db
  .sequelize
  .sync({force: false})
  .then(() => {
    // Listening in 3030 Port
    server.listen(3030);
  });