"use strict";

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  
  return User;
};