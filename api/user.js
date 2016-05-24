'use strict';

const db  = require('../models');
const is  = require('is_js');
const md5 = require('md5');

// GET: /api/users
exports.get = (req, res, next) => {
   db.users.findAll()
    .then((users) => {
      res.send(users);
      return next();
    })
    .catch((err) => res.send({}));
   
};

// GET: /api/user/:id
exports.getOne = (req, res, next) => {
   db.users.find({where: {id:req.params.id}})
    .then((todos) => {
      res.send(todos);
      return next();
    })
    .catch((err) => res.send({}));
   
};

// POST: /api/users
exports.post = (req, res, next) => {
  if (req.body.birthdate && is.not.date(req.body.birthdate)) {
    req.body.birthdate = new Date(req.body.birthdate);
  };

  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }

  db
    .users
    .create(req.body)
    .then((user) => {
      db
        .users
        .findAll()
        .then((users) => {
          res.send(users);
          return next();
        });
    })
    .catch((err) => res.send(err.errors));
  
  return next();
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
    .then((affectedRows) => {
      db.users.findAll().then((users) => {
        res.send(users);
        return next();
      });
    }); 
};


