import UsersController from '../controllers/user';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.users);

  app.get('/api/users', (req, res) => {
    usersController.get()
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/users/:id', (req, res) => {
    usersController.getOne(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.put('/api/users/:id', (req, res) => {
    usersController.put(req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.del('/api/users/:id', (req, res) => {
    usersController.del(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/users/:id/changePassword', (req, res) => {
    usersController.changePassword(req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });
};
