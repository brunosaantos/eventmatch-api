'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const lodash    = require('lodash');

import datasource from '../config/datasource';

let db        = {};
let sequelize = new Sequelize(
  datasource.database,
  datasource.username,
  datasource.password,
  {
    host: datasource.host,
    dialect: datasource.dialect
  }
);

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
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);

// export default {
//   sequelize,
//   Sequelize,
//   db
// };
