'use strict';

module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('friends', {
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Friends.belongsTo(models.users, {as: 'user1'});
        Friends.belongsTo(models.users, {as: 'user2'});
        Friends.belongsTo(models.users, {as: 'actionUser'});
      }
    }
  });

  return Friends;
};
