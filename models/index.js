'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const lodash    = require('lodash');

let db        = {};
let sequelize = new Sequelize('eventmatch_dev', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);