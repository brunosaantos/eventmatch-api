'use strict';

module.exports = (sequelize) => {
  const UserEvents = sequelize.define('users_has_events', {
  }, {
    classMethods: {
      associate: (models) => {
        UserEvents.belongsTo(models.roles);
      }
    }
  });
  
  return UserEvents;
};