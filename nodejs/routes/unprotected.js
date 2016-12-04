import UsersController from '../controllers/users';
import LoginController from '../controllers/login';

export default (app) => {
  const loginController = new LoginController(app.datasource.models.users);
  const usersController = new UsersController(app.datasource.models);

  app.post('/api/login', (req, res) => {
    loginController.post(req.body)
      .then(response => {
        req.log.info({request: req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data))
      .catch(error => req.log.error(error));
  });

  app.post('/api/users', (req, res) => {
    usersController.post(req.body)
      .then(response => {
        req.log.info({request: req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

};
