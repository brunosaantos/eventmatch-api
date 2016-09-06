'use strict';

import restify     from 'restify';
import config      from './config/config';
import datasource  from './config/datasource';
import CORS        from './config/cors';
import verifyToken from './config/verifyToken';

import UnprotectedRouter from './routes/Unprotected';
import UsersRouter       from './routes/users';
// import api         from './api';
// const db          = require('./models');

// import devSeeds from './seeds/dev';

const app = restify.createServer({
  name: 'EventMatch'
});

app.config = config;
app.datasource = datasource(app);
app.use(restify.bodyParser());
app.use(restify.queryParser());

CORS(app);

// Unprotected routes goes here:
UnprotectedRouter(app);

// Verify JWT
app.use(verifyToken);

// Protected routes goes here:
app.get('/api/verifyToken', function(req, res, next) {
  res.send(true);
  return next();
});

UsersRouter(app);
app.port = 3030;
export default app;

// app.get('/api/users', api.user.get);
// app.get('/api/users/:id', api.user.getOne);
// app.put('/api/users/:id', api.user.put);
// app.del('/api/users/:id', api.user.del);
// app.post('/api/users/:id/changePassword', api.user.changePassword);

// app.get('/api/events', api.events.get);
// app.get('/api/events/:id', api.events.getOne);
// app.post('/api/events', api.events.post);
// app.post('/api/events/:id/users', api.events.registerUser);
// app.put('/api/events/:id', api.events.put);
// app.del('/api/events/:id', api.events.del);



// Creating Tables or Initiating Connections
// db
//   .sequelize
//   .sync({force: false})
//   .then(() => {
//     // devSeeds(db);
//     // Listening in 3030 Port
//     // app.listen(3030);
//   });

// export default {
//   app,
//   db
// };
