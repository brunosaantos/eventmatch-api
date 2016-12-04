'use strict';

import restify     from 'restify';
import config      from './config/config';
import datasource  from './config/datasource';
import CORS        from './config/cors';
import verifyToken from './config/verifyToken';
import logger      from './libs/request_logger';

import UnprotectedRouter from './routes/unprotected';
import UsersRouter       from './routes/users';
import EventsRouter      from './routes/events';

// import devSeeds from './seeds/dev';

const app = restify.createServer({
  name: 'EventMatch',
  log: logger
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
EventsRouter(app);

// app.pre((req, res, next) => {
//   req.log.info({ user: 'username', endpoint: 'test' }, 'END');
//   return next();
// });

app.port = 3030;
export default app;
