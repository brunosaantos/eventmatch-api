import UsersController from '../controllers/users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models);

  app.get('/api/users', (req, res) => {
    usersController.get()
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/users/:id', (req, res) => {
    usersController.getOne(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.put('/api/users/:id', (req, res) => {
    usersController.put(req.decoded, req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.del('/api/users/:id', (req, res) => {
    usersController.del(req.decoded, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/users/:id/changePassword', (req, res) => {
    usersController.changePassword(req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });


  // Friends
  app.post('/api/users/:id/friends', (req, res, next) => {
    usersController.addFriend(req.decoded, req.params, next)
      .then(response => res.json(response.statusCode, response.data));
  });
};
