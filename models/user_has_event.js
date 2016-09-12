'use strict';

module.exports = (sequelize) => {
  const UserEvents = sequelize.define('users_has_events', {
  }, {
    classMethods: {
      associate: (models) => {
        UserEvents.hasOne(models.roles);
      }
    }
  });

  return UserEvents;
};
