'use strict';

module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('boards', {
    content: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Boards.belongsTo(models.users);
        Boards.belongsTo(models.events);
        Boards.hasMany(models.boards_replies, {as: 'reply'});
      }
    }
  });

  return Boards;
};
