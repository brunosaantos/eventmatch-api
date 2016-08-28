'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('tickets', {
    type: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Tickets.belongsTo(models.events);
      }
    }
  });

  return Tickets;
};
