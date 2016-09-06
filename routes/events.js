import EventsController from '../controllers/events';

export default (app) => {
  const eventsController = new EventsController(app.datasource.models);

  app.get('/api/events', (req, res) => {
    eventsController.get(req.query.embed)
      .then(response => {
        res.json(response.statusCode, response.data);
      });
  });

  app.get('/api/events/:id', (req, res) => {
    eventsController.getOne(req.params, req.query.embed)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events', (req, res) => {
    eventsController.post(req.body)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.put('/api/events/:id', (req, res) => {
    eventsController.put(req.body, req.params)
      .then(response => res.json(response.statusCode, response.data));
  });

  app.del('/api/events/:id', (req, res) => {
    eventsController.del(req.params)
      .then(response => res.json(response.statusCode, response.data));
  });
};
