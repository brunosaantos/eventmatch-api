'use strict';

module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('polls', {
    question: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Polls.hasMany(models.answers, {as: { singular: 'answer', plural: 'answers'}});
      }
    }
  });

  return Polls;
};
