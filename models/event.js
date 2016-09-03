'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe o nome do evento'
        }
      }
    },
    address: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe a data do evento'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    classification: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.FLOAT(10, 6),
      validate: {
        isFloat: true
      }
    },
    lng: {
      type: DataTypes.FLOAT(10, 6),
      validate: {
        isFloat: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsToMany(models.users, {through: models.users_has_events});
        Event.hasMany(models.polls);
        Event.hasMany(models.tickets);
      }
    }
  });

  return Event;
};
