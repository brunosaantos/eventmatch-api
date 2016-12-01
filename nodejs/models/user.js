'use strict';
import md5 from 'md5';
import { ValidationError } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const validatePassword = user => {
    const pattern = new RegExp(/(?=.{6,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/g);

    if (pattern.test(user.password)) {
      return user.set('password', md5(user.password));
    }

    return sequelize.Promise.reject(new ValidationError(`A senha ter no mínimo 6 caracteres e
      deve conter letras maiúsculas e minúsculas,
      números e caracteres especiais`));
  };

  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        notEmpty: {
          msg: 'Por favor, insira um nome de usuário'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, insira uma senha'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, insira um nome'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, insira um email'
        },
        isEmail: {
          msg: 'Email em um formato inválido'
        }
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: user => validatePassword(user),
      beforeUpdate: user => validatePassword(user)
    }
  },{
    classMethods: {
      associate: (models) => {
        User.hasMany(models.boards, {foreignKeyConstraint: true});
        User.hasMany(models.boards_replies, {foreignKeyConstraint: true});
        User.hasMany(models.polls);
        User.hasMany(models.raffles, {as: 'winner'});
        User.hasMany(models.friends, {as: 'friend'});
        User.belongsToMany(models.events, {through: models.users_has_events});
      }
    }
  });

  return User;
};
