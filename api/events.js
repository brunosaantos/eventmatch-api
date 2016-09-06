'use strict';

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class EventsController {
  constructor (Models) {
    this.events = Models.events;
    this.users = Models.users;
  }

  get (embed) {
    let include = [];
    if (embed == 'users') include.push(this.users);

    return this.events.findAll({include: include})
      .then(events => defaultResponse(events))
      .catch(error => errorResponse(error.message));
  }

  getOne (params, embed) {
    let include = [];
    if (embed == 'users') include.push(this.users);

    return this.events.findOne({where: {id: params.id}, include: include})
      .then(event => defaultResponse(event))
      .catch(error => errorResponse(error.message));
  }

  post (data) {
    return this.events.create(data)
      .then(event => defaultResponse(event, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  put (data, params) {
    return this.events.update(data, {where: {id: params.id}})
      .then(event => defaultResponse(event))
      .catch(error => errorResponse(error.message, 422));
  }

  del (params) {
    return this.events
      .destroy({where: {id:params.id}})
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 404));
  }
}

export default EventsController;

// import moment from 'moment';

// import app from '../app';
// let db = app.datasource.models;

// moment.locale('pt-br');
//
// // GET: /api/events(?embed=users)
// exports.get = (req, res, next) => {
//   let include = [];
//
//   if (req.query.embed === 'users') {include.push(db.users);}
//
//   db
//     .events
//     .findAll({ include: include })
//     .then((events) => {
//       events.map(event => {
//         if (event.dataValues.date) {
//           event.dataValues['dateCalendar'] = moment(event.dataValues.date).calendar();
//         }
//       });
//       res.send(events);
//       return next();
//     })
//     .catch((err) => res.send(err));
// };
//
// // GET: /api/events/:id(?embed=users)
// exports.getOne = (req, res, next) => {
//   let include = [db.tickets];
//
//   if (req.query.embed === 'users') {include.push(db.users);}
//
//   db
//     .events
//     .find({
//       where: { id:req.params.id },
//       include: include
//     })
//     .then((event) => {
//       if (event.dataValues.date) {
//         event.dataValues['dateCalendar'] = moment(event.dataValues.date).calendar();
//       }
//
//       res.send(event);
//       return next();
//     })
//     .catch((err) => res.send(err));
// };
//
// // POST: /api/events
// exports.post = (req, res, next) => {
//
//   db
//     .events
//     .create(req.body, {
//       include: db.tickets
//     })
//     .then(event => {
//       // TODO: Refactor
//       if (req.body.admin) {
//         db.users_has_events
//         .create({
//           eventId: event.id,
//           userId: req.body.admin,
//           roleId: 1
//         });
//       }
//       return res.send(201, event);
//     })
//     .catch(err => res.send(400, err.errors));
//
//   return next();
// };
//
// // POST: /api/events/:id/users
// exports.registerUser = (req, res, next) => {
//   db
//     .users_has_events
//     .create({
//       eventId: 1,
//       userId: 1,
//       roleId: 1
//     })
//     .then(() => {
//       db
//         .users_has_events
//         .findAll({
//           where: { eventId: 1 }
//         })
//         .then((usersEvents) => {
//           res.send(usersEvents);
//           return next();
//         });
//     })
//     .catch((err) => res.send(400, err.errors));
// };
//
// // PUT: /api/events/:id
// exports.put = (req, res, next) => {
//   db
//     .events
//     .find({where: {id:req.params.id}})
//     .then((event) => {
//       event
//         .update(req.body)
//         .then((event) => {
//           res.send(event);
//           return next();
//         });
//     });
// };
//
// // DELETE: /api/events/:id
// exports.del = (req, res, next) => {
//   db
//     .events
//     .destroy({
//       where: {
//         id:req.params.id
//       }
//     })
//     .then(() => {
//       db.events.findAll().then((events) => {
//         res.send(events);
//         return next();
//       });
//     });
// };
