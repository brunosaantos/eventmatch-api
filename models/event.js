'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
    classification: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.FLOAT(10, 6)
    },
    long: {
      type: DataTypes.FLOAT(10, 6)
    }
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsToMany(models.users, {through: 'users_has_events'});
        Event.hasMany(models.polls);
      }
    }
  });
    
  return Event;
};