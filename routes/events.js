import EventsController from '../controllers/events';

export default (app) => {
  const eventsController = new EventsController(app.datasource.models);

  app.get('/api/events/search', (req, res) => {
    eventsController.search(req.query)
      .then(response => {
        res.json(response.statusCode, response.data);
      });
  });

  app.get('/api/events', (req, res) => {
    eventsController.get()
      .then(response => {
        res.json(response.statusCode, response.data);
      });
  });

  app.get('/api/events/:id', (req, res) => {
    eventsController.getOne(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events', (req, res) => {
    eventsController.post(req.decoded, req.body)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.put('/api/events/:id', (req, res) => {
    eventsController.put(req.decoded, req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.del('/api/events/:id', (req, res) => {
    eventsController.del(req.decoded, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/users', (req, res) => {
    eventsController.getRegistedUsers(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/users', (req, res) => {
    eventsController.registerUser(req.decoded, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/boards', (req, res) => {
    eventsController.getBoards(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/boards', (req, res) => {
    eventsController.createBoard(req.decoded, req.params, req.body)
      .then(response => res.json(response.statusCode, response.data));
  });
};
