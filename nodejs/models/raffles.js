'use strict';

module.exports = (sequelize, DataTypes) => {
  const Raffles = sequelize.define('raffles', {
    title: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Raffles.belongsTo(models.users, {as: 'winner'});
        Raffles.belongsTo(models.events, {as: 'event'});
      }
    }
  });

  return Raffles;
};
