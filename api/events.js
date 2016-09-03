'use strict';

import moment from 'moment';

const db      = require('../models');

moment.locale('pt-br');

// GET: /api/events(?embed=users)
exports.get = (req, res, next) => {
  let include = [];

  if (req.query.embed === 'users') {include.push(db.users);}

  db
    .events
    .findAll({ include: include })
    .then((events) => {
      events.map(event => {
        if (event.dataValues.date) {
          event.dataValues['dateCalendar'] = moment(event.dataValues.date).calendar();
        }
      });
      res.send(events);
      return next();
    })
    .catch((err) => res.send(err));
};

// GET: /api/events/:id(?embed=users)
exports.getOne = (req, res, next) => {
  let include = [db.tickets];

  if (req.query.embed === 'users') {include.push(db.users);}

  db
    .events
    .find({
      where: { id:req.params.id },
      include: include
    })
    .then((event) => {
      if (event.dataValues.date) {
        event.dataValues['dateCalendar'] = moment(event.dataValues.date).calendar();
      }

      res.send(event);
      return next();
    })
    .catch((err) => res.send(err));
};

// POST: /api/events
exports.post = (req, res, next) => {

  db
    .events
    .create(req.body, {
      include: db.tickets
    })
    .then(event => {
      // TODO: Refactor
      if (req.body.admin) {
        db.users_has_events
        .create({
          eventId: event.id,
          userId: req.body.admin,
          roleId: 1
        });
      }
      return res.send(201, event);
    })
    .catch(err => res.send(400, err.errors));

  return next();
};

// POST: /api/events/:id/users
exports.registerUser = (req, res, next) => {
  db
    .users_has_events
    .create({
      eventId: 1,
      userId: 1,
      roleId: 1
    })
    .then(() => {
      db
        .users_has_events
        .findAll({
          where: { eventId: 1 }
        })
        .then((usersEvents) => {
          res.send(usersEvents);
          return next();
        });
    })
    .catch((err) => res.send(400, err.errors));
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
