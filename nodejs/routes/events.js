import EventsController  from '../controllers/events';
import BoardsController  from '../controllers/boards';
import PollsController   from '../controllers/polls';
import TicketsController from '../controllers/tickets';
import RafflesController from '../controllers/raffles';

export default (app) => {
  const eventsController  = new EventsController(app.datasource.models);
  const boardsController  = new BoardsController(app.datasource.models);
  const pollsController   = new PollsController(app.datasource.models);
  const ticketsController = new TicketsController(app.datasource.models);
  const rafflesController = new RafflesController(app.datasource);

  app.get('/api/events/search', (req, res) => {
    eventsController.search(req.query)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events', (req, res) => {
    eventsController.get()
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id', (req, res) => {
    eventsController.getOne(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events', (req, res) => {
    eventsController.post(req.decoded, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.put('/api/events/:id', (req, res) => {
    eventsController.put(req.decoded, req.body, req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.del('/api/events/:id', (req, res) => {
    eventsController.del(req.decoded, req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/users', (req, res) => {
    eventsController.getRegistedUsers(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/users', (req, res) => {
    eventsController.registerUser(req.decoded, req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/boards', (req, res) => {
    boardsController.get(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/boards', (req, res) => {
    boardsController.create(req.decoded, req.params, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/boards/:boardId/replies', (req, res) => {
    boardsController.getReplies(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/boards/:boardId/replies', (req, res) => {
    boardsController.createReply(req.decoded, req.params, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/polls', (req, res) => {
    pollsController.get(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/polls', (req, res) => {
    pollsController.create(req.params, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/polls/:pollId/answers/:answerId', (req, res) => {
    pollsController.vote(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/tickets', (req, res) => {
    ticketsController.get(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/tickets', (req, res) => {
    ticketsController.create(req.decoded, req.params, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.get('/api/events/:id/raffles', (req, res) => {
    rafflesController.get(req.params)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

  app.post('/api/events/:id/raffles', (req, res) => {
    rafflesController.create(req.decoded, req.params, req.body)
      .then(response => {
        req.log.info({req, response});
        return response;
      })
      .then(response => res.json(response.statusCode, response.data));
  });

};
