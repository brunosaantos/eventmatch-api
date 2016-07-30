'use strict';

const db      = require('../models');

// GET: /api/events(?embed=users)
exports.get = (req, res, next) => {
  const include = [];

  if (req.query.embed === 'users') {include.push(db.users);}
  
  db
    .events
    .findAll({ include: include})
    .then((events) => {
      res.send(events);
      return next();
    })
    .catch((err) => res.send(err));
};

// GET: /api/events/:id(?embed=users)
exports.getOne = (req, res, next) => {
  const include = [];

  if (req.query.embed === 'users') {include.push(db.users);}
  
  db
    .events
    .find({
      where: { id:req.params.id },
      include: include
    })
    .then((event) => {
      res.send(event);
      return next();
    })
    .catch((err) => res.send(err));
};

// GET: /api/events/:id/users
exports.getOneUsers = (req, res, next) => {
  db
    .events
    .find({ 
      where: { id:req.params.id },
      include: [ db.users ]
    })
    .then((event) => {      
      res.send(event);
      return next();
    })
    .catch(() => res.send({}));
};

// POST: /api/events
exports.post = (req, res, next) => {
  db
    .events
    .create(req.body)
    .then(() => {
      db
        .events
        .findAll()
        .then((events) => {
          res.send(events);
          return next();
        });
    })
    .catch((err) => res.send(400, err.errors));
  
  return next();
};

// PUT: /api/events/:id
exports.put = (req, res, next) => {
  db
    .events
    .find({where: {id:req.params.id}})
    .then((event) => {
      event
        .update(req.body)
        .then((event) => {
          res.send(event);
          return next();
        });
    });
};

// DELETE: /api/events/:id
exports.del = (req, res, next) => {
  db
    .events
    .destroy({
      where: {
        id:req.params.id
      }
    })
    .then(() => {
      db.events.findAll().then((events) => {
        res.send(events);
        return next();
      });
    }); 
};