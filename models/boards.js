'use strict';

module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('boards', {
    content: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Boards.hasMany(models.boards_replies);
      }
    }
  });
  
  return Boards;
};