'use strict';
import restify from 'restify';
import jwt     from 'jsonwebtoken';
const config  = require('./config');

export default (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secretToken, (err, decoded) => {
      if (err) {
        return next(new restify.UnauthorizedError('Invalid token'));
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return next(new restify.UnauthorizedError('No token provided'));

  }
};
