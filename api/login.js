'use strict';

const restify = require('restify');
const db      = require('../models');
const md5     = require('md5');
const jwt     = require('jsonwebtoken');
const config  = require('./../config/config');

// POST: /api/login
exports.post = (req, res, next) => {
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }

  db
    .users
    .find({
      where: req.body
    })
    .then((user) => {
      if (!user) {
        return next(new restify.UnauthorizedError('Nome de usuário e/ou senha invalidos'));
      }

      // remove password from user object
      delete user.dataValues['password'];

      let token = jwt.sign({
        id: user.id,
        username: user.username
      }, config.secretToken, {
        expiresIn: '365 days'
      });

      res.send({
        token,
        user
      });

      return next();
    })
    .catch(() => res.send({}));
};
