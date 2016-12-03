import app from './app';

const startApp = () => {
  app.datasource.sequelize.sync().then(() => {
    app.listen(app.port, () => {
      console.log(`Listening on port ${app.port}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => console.log(err)); // eslint-disable-line no-console
};

startApp();
