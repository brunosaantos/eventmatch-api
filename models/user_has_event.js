'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserEvents = sequelize.define('users_has_events', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return UserEvents;
};
