'use strict';

module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define('answers', {
    answer: {
      type: DataTypes.STRING
    },
    votes: {
      type: DataTypes.INTEGER
    }
  });
  
  return Answers;
};