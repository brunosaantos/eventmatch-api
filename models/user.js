'use strict';
import md5 from 'md5';

module.exports = (sequelize, DataTypes) => {
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
      beforeCreate: user => user.set('password', md5(user.password))
    }
  },{
    classMethods: {
      associate: (models) => {
        User.hasMany(models.boards);
        User.hasMany(models.polls);
        User.hasMany(models.raffles, {as: 'Winner'});
        User.belongsToMany(models.events, {through: models.users_has_events});
      }
    }
  });

  return User;
};
