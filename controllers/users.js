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
    return this.Users.findAll({})
      .then(users => {
        users.map(user => {
          if (user.dataValues) delete user.dataValues.password;
          if (user.password) delete user.password;
        });
        return defaultResponse(users);
      })
      .catch(error => errorResponse(error.errors));
  }

  getOne (params) {
    return this.Users.findOne({where: {id: params.id}})
      .then(user => {
        if (user.dataValues) delete user.dataValues.password;
        if (user.password) delete user.password;
        return defaultResponse(user);
      })
      .catch(error => errorResponse(error.errors));
  }

  post (data) {
    if (data.birthdate && is.not.date(data.birthdate)) {
      data.birthdate = new Date(data.birthdate);
    }

    return this.Users
      .create(data)
      .then(user => {
        if (user.dataValues) delete user.dataValues.password;
        if (user.password) delete user.password;

        return defaultResponse(user, 201);
      })
      .catch(error => errorResponse(error.errors, 422));
  }

  put (decodedToken, data, params) {
    if (decodedToken.id != params.id) {
      return errorResponse('Forbidden', 403);
    }

    if (data.birthdate && is.not.date(data.birthdate)) {
      data.birthdate = new Date(data.birthdate);
    }

    if (data.password) {
      data.password = md5(data.password);
    }

    return this.Users
      .update(data, {where: {id: params.id}})
      .then(user => defaultResponse(user))
      .catch(error => errorResponse(error.errors, 422));
  }

  del (decodedToken, params) {
    if (decodedToken.id != params.id) {
      return errorResponse('Forbidden', 403);
    }

    return this.Users
      .destroy({where: {id:params.id}})
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.errors, 404));
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
      .catch(error => errorResponse(error.errors, 400));
  }
}

export default UsersController;
