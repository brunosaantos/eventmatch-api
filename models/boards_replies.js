'use strict';

module.exports = (sequelize, DataTypes) => {
  const BoardsReplies = sequelize.define('boards_replies', {
    content: {
      type: DataTypes.STRING
    }
  });
  
  return BoardsReplies;
};