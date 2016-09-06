'use strict';

import restify     from 'restify';
import config      from './config/config';
import datasource  from './config/datasource';
import CORS        from './config/cors';
// import verifyToken from './config/verifyToken';

import UnprotectedRouter from './routes/Unprotected';
import UsersRouter       from './routes/users';
import EventsRouter      from './routes/events';
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
// app.use(verifyToken);

// Protected routes goes here:
app.get('/api/verifyToken', function(req, res, next) {
  res.send(true);
  return next();
});

UsersRouter(app);
EventsRouter(app);

app.port = 3030;
export default app;

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
