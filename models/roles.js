'use strict';

module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Roles.belongsTo(models.events);
      }
    }
  });

  return Roles;
};
