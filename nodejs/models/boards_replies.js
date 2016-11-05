'use strict';

module.exports = (sequelize, DataTypes) => {
  const BoardsReplies = sequelize.define('boards_replies', {
    content: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        BoardsReplies.belongsTo(models.users, {as: 'author'});
        BoardsReplies.belongsTo(models.boards, {as: 'board'});
      }
    }
  });

  return BoardsReplies;
};
