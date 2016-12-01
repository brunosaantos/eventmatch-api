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
  constructor (Models) {
    this.Users   = Models.users;
    this.Friends = Models.friends;
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
      .catch(error => {
        console.log(error);
        return errorResponse(error.errors, 422);
      });
  }

  put (decodedToken, data, params) {
    if (decodedToken.id != params.id) {
      return errorResponse('Forbidden', 403);
    }

    if (data.birthdate && is.not.date(data.birthdate)) {
      data.birthdate = new Date(data.birthdate);
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

        if(user.dataValues.password !== oldPassword) {
          return next(new restify.UnauthorizedError('Senha atual incorreta'));
        }

        return user
          .update({password: data.new})
          .then(user => defaultResponse(user))
          .catch(error => errorResponse(error.errors, 400));
      })
      .catch(error => errorResponse(error.errors, 400));
  }

  getFriendship(decodedToken, params) {
    const user1Id = Math.min(decodedToken.id, params.id);
    const user2Id = Math.max(decodedToken.id, params.id);

    return this.Friends
      .findOne({where: {user1Id, user2Id}})
        .then(friendship => defaultResponse(friendship))
        .catch(error => errorResponse(error));
  }

  addFriend(decodedToken, params, next) {
    if (decodedToken.id == params.id) {
      return next(new restify.UnauthorizedError('Você não pode adicionar você mesmo'));
    }

    const user1Id = Math.min(decodedToken.id, params.id);
    const user2Id = Math.max(decodedToken.id, params.id);

    return this.Friends
      .findOne({where: {user1Id, user2Id}})
        .then(friendship => {
          if(!friendship) {
            let data = {
              user1Id,
              user2Id,
              status: 'pending',
              actionUserId: decodedToken.id
            };

            return this.Friends
              .create(data)
              .then(newFriendship => defaultResponse(newFriendship, 201));
          }

          if (friendship.getDataValue('status') === 'accepted') {
            // return next(new restify.UnauthorizedError('Esta amizade já existe'));
            return errorResponse('Esta amizade já existe');
          }

          if (friendship.getDataValue('status') === 'pending') {
            return friendship.update({
              status: 'accepted',
              actionUserId: decodedToken.id
            })
            .then(updatedFriendship => defaultResponse(updatedFriendship))
            .catch(error => errorResponse(error.response, 422));
          }

          return false;
        })
        .catch(error => {
          return errorResponse(error.errors, 422);
        });

    // return this.Users
    //   .findOne({where: {id: user1Id}})
    //   .then(user1 => {
    //     return this.Users.findOne({where: {id: user2Id}})
    //       .then(user2 => {
    //
    //       })
    //       .catch(error => errorResponse(error.errors, 400));
    //
    //   })
    //   .catch(error => errorResponse(error.errors, 400));



  }
}

export default UsersController;
