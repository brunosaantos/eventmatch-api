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
        return next(new restify.UnauthorizedError('Invalid username or password'));
      };

      let token = jwt.sign({
        username: user.username
      }, config.secretToken, {
        expiresIn: '24h'
      });

      res.send({
        token : token
      });

      return next();
    })
    .catch((err) => res.send({}));
};
