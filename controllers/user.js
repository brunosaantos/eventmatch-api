'use strict';

// const db      = require('../models');
const is      = require('is_js');
const md5     = require('md5');
const restify = require('restify');

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class UsersController {
  constructor (Users) {
    this.Users = Users;
  }

  get () {
    return this.Users.findAll()
      .then(users => {
        users.map(user => delete user.dataValues['password']);
        return defaultResponse(users);
      })
      .catch(error => errorResponse(error.message));
  }

  getOne (params) {
    return this.Users.findOne({where: {id: params.id}})
      .then(user => {
        delete user.dataValues['password'];
        return defaultResponse(user);
      })
      .catch(error => errorResponse(error.message));
  }

  post (data) {
    if (data.birthdate && is.not.date(data.birthdate)) {
      data.birthdate = new Date(data.birthdate);
    }

    if (data.password) {
      data.password = md5(data.password);
    }

    return this.Users
      .create(data)
      .then(user => {
        delete user.dataValues.password;
        return defaultResponse(user, 201);
      })
      .catch(error => errorResponse(error.message, 422));
  }

  put (data, params) {
    if (data.birthdate && is.not.date(data.birthdate)) {
      data.birthdate = new Date(data.birthdate);
    }

    if (data.password) {
      data.password = md5(data.password);
    }

    return this.Users
      .update(data, {where: {id: params.id}})
      .then(user => defaultResponse(user))
      .catch(error => errorResponse(error.message, 422));
  }

  del (params) {
    return this.Users
      .destroy({where: {id:params.id}})
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 404));
  }

  changePassword (data, params, next) {
    return this.Users
      .find({where: {id:params.id}})
      .then(user => {
        let oldPassword = md5(data.old);
        let newPassword = md5(data.new);

        if(user.dataValues.password !== oldPassword) {
          return next(new restify.UnauthorizedError('Senha atual incorreta'));
        }

        return user
          .update({password: newPassword})
          .then(user => defaultResponse(user));
      })
      .catch(error => errorResponse(error.message, 400));
  }
}

export default UsersController;

// GET: /api/users
// exports.get = (req, res) => {
//   db.users.findAll()
//     .then(users => {
//       // remove password from user object
//       users.map(user => delete user.dataValues['password']);
//       return res.send(200, users);
//     })
//     .catch(() => res.send({}));
//
// };
//
// // GET: /api/user/:id
// exports.getOne = (req, res) => {
//   db.users.find({where: {id:req.params.id}})
//     .then(user => {
//       // remove password from user object
//       delete user.dataValues['password'];
//
//       return res.send(user);
//     })
//     .catch(() => res.send({}));
//
// };
//
// // POST: /api/users
// exports.post = (req, res) => {
//   if (req.body.birthdate && is.not.date(req.body.birthdate)) {
//     req.body.birthdate = new Date(req.body.birthdate);
//   }
//
//   if (req.body.password) {
//     req.body.password = md5(req.body.password);
//   }
//
//   db
//     .users
//     .create(req.body)
//     .then(user => {
//       delete user.dataValues.password;
//       return res.send(201, user);
//     })
//     .catch(err => res.send(412, err.errors));
// };
//
// // PUT: /api/users/:id
// exports.put = (req, res) => {
//   if (req.body.birthdate && is.not.date(req.body.birthdate)) {
//     req.body.birthdate = new Date(req.body.birthdate);
//   }
//
//   if (req.body.password) {
//     req.body.password = md5(req.body.password);
//   }
//
//   db
//     .users
//     .update(req.body, {where: {id: req.params.id}})
//     .then(user => res.send(user))
//     .catch(err => res.send(404, err.errors));
// };
//
// // DELETE: /api/users/:id
// exports.del = (req, res) => {
//   db
//     .users
//     .destroy({where: {id:req.params.id}})
//     .then(() => res.send(204))
//     .catch(() => res.send(404));
// };
//
// // POST: /api/users/:id/changePassword
// exports.changePassword = (req, res, next) => {
//   db
//     .users
//     .find({where: {id:req.params.id}})
//     .then((user) => {
//       var oldPassword = md5(req.body.old);
//       var newPassword = md5(req.body.new);
//
//       if(user.dataValues.password !== oldPassword) {
//         return next(new restify.UnauthorizedError('Senha atual incorreta'));
//       }
//
//       user
//         .update({
//           password: newPassword
//         })
//         .then(() => {
//           res.send({success: true});
//           return next();
//         });
//     })
//     .catch((err) => res.send(400, err.errors));
//
//   return next();
// };
