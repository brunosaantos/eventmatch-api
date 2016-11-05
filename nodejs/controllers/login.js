'use strict';

// const restify = require('restify');
// const db      = require('../models');
const md5     = require('md5');
const jwt     = require('jsonwebtoken');
const config  = require('./../config/config');

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class LoginController {
  constructor (Users) {
    this.Users = Users;
  }

  post (data) {
    if (data.password) {
      data.password = md5(data.password);
    }

    return this.Users
      .find({where: data})
      .then(user => {
        if (!user) {
          return errorResponse('Nome de usuário e/ou senha inválidos', 404);
        }

        // remove password from user object
        delete user.dataValues['password'];

        let token = jwt.sign({
          id: user.id,
          username: user.username
        }, config.secretToken, {
          expiresIn: '365 days'
        });

        return defaultResponse({
          token,
          user
        });

      })
      .catch(error => errorResponse(error.message));
  }
}

export default LoginController;

// POST: /api/login
// exports.post = (req, res, next) => {
//   if (req.body.password) {
//     req.body.password = md5(req.body.password);
//   }
//
//   db
//     .users
//     .find({
//       where: req.body
//     })
//     .then((user) => {
//       if (!user) {
//         return next(new restify.UnauthorizedError('Nome de usuário e/ou senha invalidos'));
//       }
//
//       // remove password from user object
//       delete user.dataValues['password'];
//
//       let token = jwt.sign({
//         id: user.id,
//         username: user.username
//       }, config.secretToken, {
//         expiresIn: '365 days'
//       });
//
//       res.send({
//         token,
//         user
//       });
//
//       return next();
//     })
//     .catch(() => res.send({}));
// };
