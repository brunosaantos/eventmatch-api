"use strict";

const db = require('../models');

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
    });
  
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


