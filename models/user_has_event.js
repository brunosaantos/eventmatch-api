'use strict';

module.exports = (sequelize, DataTypes) => {
  let UserEvents = sequelize.define('users_has_events', {
    status: {
      type: DataTypes.STRING
    }
  });
  
  return UserEvents;
};