import UsersController from '../api/user';
import LoginController from '../api/login';

export default (app) => {
  const loginController = new LoginController(app.datasource.models.users);
  const usersController = new UsersController(app.datasource.models.users);

  app.post('/api/login', (req, res) => {
    loginController.post(req.body)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/users', (req, res) => {
    usersController.post(req.body)
      .then(response => res.json(response.statusCode, response.data));
  });

};
