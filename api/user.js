'use strict';

const db      = require('../models');
const is      = require('is_js');
const md5     = require('md5');
const restify = require('restify');

// GET: /api/users
exports.get = (req, res, next) => {
  db.users.findAll()
    .then((users) => {
      // remove password from user object
      users.map(user => delete user.dataValues['password']);
      res.send(users);
      return next();
    })
    .catch(() => res.send({}));

};

// GET: /api/user/:id
exports.getOne = (req, res, next) => {
  db.users.find({where: {id:req.params.id}})
    .then((user) => {
      // remove password from user object
      delete user.dataValues['password'];

      res.send(user);
      return next();
    })
    .catch(() => res.send({}));

};

// POST: /api/users
exports.post = (req, res, next) => {
  if (req.body.birthdate && is.not.date(req.body.birthdate)) {
    req.body.birthdate = new Date(req.body.birthdate);
  }

  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }

  db
    .users
    .create(req.body)
    .then(() => {
      db
        .users
        .findAll()
        .then((users) => {
          res.send(users);
          return next();
        });
    })
    .catch((err) => res.send(400, err.errors));

  return next();
};

// PUT: /api/user/:id
exports.put = (req, res, next) => {
  if (req.body.birthdate && is.not.date(req.body.birthdate)) {
    req.body.birthdate = new Date(req.body.birthdate);
  }

  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }

  db
    .users
    .find({where: {id:req.params.id}})
    .then((user) => {
      user
        .update(req.body)
        .then((user) => {
          // remove password from user object
          delete user.dataValues['password'];

          res.send(user);
          return next();
        });
    });

};

// DELETE: /api/users/:id
exports.del = (req, res, next) => {
  db
    .users
    .destroy({
      where: {
        id:req.params.id
      }
    })
    .then(() => {
      db.users.findAll().then((users) => {
        res.send(users);
        return next();
      });
    });
};

// POST: /api/users/:id/changePassword
exports.changePassword = (req, res, next) => {
  db
    .users
    .find({where: {id:req.params.id}})
    .then((user) => {
      var oldPassword = md5(req.body.old);
      var newPassword = md5(req.body.new);

      if(user.dataValues.password !== oldPassword) {
        return next(new restify.UnauthorizedError('Senha atual incorreta'));
      }

      user
        .update({
          password: newPassword
        })
        .then(() => {
          res.send({success: true});
          return next();
        });
    })
    .catch((err) => res.send(400, err.errors));

  return next();
};
