import Sequelize from 'sequelize';
import fs        from 'fs';
import path      from 'path';

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  Object.keys(models).forEach(function(modelName) {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};

export default function (app) {
  if (!database) {
    const config = app.config;

    const sequelize = new Sequelize(
        config.database.database,
        config.database.username,
        config.database.password,
        config.database.params
      );

    database = {
      sequelize,
      Sequelize,
      models: {}
    };

    database.models = loadModels(sequelize);

    // sequelize.sync({force:true}).done(() => database);
    sequelize.sync().done(() => database);
  }
  return database;
}
