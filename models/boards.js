'use strict';

module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('boards', {
    content: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Boards.belongsTo(models.users, {as: 'author'});
        Boards.belongsTo(models.events, {as: 'event'});
        Boards.hasMany(models.boards_replies, {as: 'reply'});
      }
    }
  });

  return Boards;
};
