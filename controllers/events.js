'use strict';
import moment from 'moment';
moment.locale('pt-br');

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

  get () {
    return this.events.findAll({include: [{ all: true }]})
      .then(events => {
        events.map(event => {
          if (event.dataValues) {
            event.dataValues.dateCalendar = moment(event.dataValues.date).calendar();
          }

          if (event.date) {
            event.dateCalendar = moment(event.date).calendar();
          }
        });

        return defaultResponse(events);
      })
      .catch(error => errorResponse(error.errors));
  }

  getOne (params) {
    return this.events.findOne({where: {id: params.id}, include: [{ all: true }]})
      .then(event => {
        if (event.dataValues) {
          event.dataValues.dateCalendar = moment(event.dataValues.date).calendar();
        }

        if (event.date) {
          event.dateCalendar = moment(event.date).calendar();
        }

        return defaultResponse(event);
      })
      .catch(error => errorResponse(error.errors));
  }

  post (decodedToken, data) {
    return this.events.create(data)
      .then(event => {
        if (event.dataValues) {
          event.dataValues.dateCalendar = moment(event.dataValues.date).calendar();
        }

        if (event.date) {
          event.dateCalendar = moment(event.date).calendar();
        }

        // add creator to event as admin
        return event.addUsers(decodedToken.id, {admin: true})
          .then(() => defaultResponse(event, 201));

      })
      .catch(error => errorResponse(error, 422));
  }

  put (decodedToken, data, params) {
    if (decodedToken.id != params.id) {
      return errorResponse('Forbidden', 403);
    }

    return this.events.update(data, {where: {id: params.id}})
      .then(event => {
        if (event.dataValues) {
          event.dataValues.dateCalendar = moment(event.dataValues.date).calendar();
        }

        if (event.date) {
          event.dateCalendar = moment(event.date).calendar();
        }

        return defaultResponse(event);
      })
      .catch(error => errorResponse(error.errors, 422));
  }

  del (decodedToken, params) {
    if (decodedToken.id != params.id) {
      return errorResponse('Forbidden', 403);
    }

    return this.events
      .destroy({where: {id:params.id}})
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.errors, 404));
  }

  getRegistedUsers (params) {
    return this.events
      .findOne({where: {id: params.id}})
      .then(event => {
        return event.getUsers()
          .then(users => defaultResponse(users))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }

  registerUser (decodedToken, params) {
    return this.events
      .findOne({where: {id: params.id}})
      .then(event => {
        return event.addUsers(decodedToken.id)
          .then(user => defaultResponse(user, 201))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
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
