describe('Boards', () => {
  const Users = app.datasource.models.users;
  const Events = app.datasource.models.events;
  const Boards = app.datasource.models.boards;
  const BoardsReplies = app.datasource.models.boards_replies;

  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': '123',
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '01-01-2000',
    'gender': true
  };

  const defaultEvent = {
    'id'  : 1,
    'name': 'test event',
    'date': '2016-07-07',
    'type': ''
  };

  const defaultBoard = {
    'id': 1,
    'content': 'Lorem ipsum dolor sit amet',
    'eventId': 1,
    'authorId': 1
  };

  const defaultBoardReply = {
    'id': 1,
    'content': 'Reply to: Lorem ipsum dolor sit amet',
    'boardId': 1,
    'authorId': 1
  };

  let token = null;

  before(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => request.post('/api/login').send({username: defaultUser.username, password: defaultUser.password}))
      .then(res => token = res.body.token)
      .then(() => {
        Events
          .destroy({where: {}})
          .then(() => {
            return Events.create(defaultEvent)
              .then(event => event.addUsers(1, {admin: true}))
              .then(() => done());
          });
      });
  });

  beforeEach(done => {
    Boards
      .destroy({where: {}})
      .then(() => {
        BoardsReplies
          .destroy({where: {}})
          .then(() => {
            return Boards.create(defaultBoard)
            .then(board => board.createReply(defaultBoardReply))
            .then(() => done());
          });
      });
  });

  describe('GET /api/events/{id}/boards/', () => {
    it('should return a list of board registered on an event', done => {
      request
        .get('/api/events/1/boards')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].content).to.be.eql(defaultBoard.content);
          expect(res.body[0].author.username).to.be.eql(defaultUser.username);
          done(err);
        });
    });
  });

  describe('POST /api/events/{id}/boards', () => {
    it('should register a board reply on an event', done => {
      const board = {
        'id': 2,
        'content': 'The second board'
      };

      request
        .post('/api/events/1/boards')
        .set('x-access-token', token)
        .send(board)
        .end((err, res) => {
          expect(res.body.content).to.be.eql(board.content);
          expect(res.body.eventId).to.be.eql(defaultEvent.id);
          expect(res.body.authorId).to.be.eql(defaultUser.id);
          expect(res.statusCode).to.be.eql(201);
          done(err);
        });

    });
  });

  describe('GET /api/events/{id}/boards/{id}/replies', () => {
    it('should return a list of board replies registered on a board', done => {
      request
        .get('/api/events/1/boards/1/replies')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].content).to.be.eql(defaultBoardReply.content);
          expect(res.body[0].board.content).to.be.eql(defaultBoard.content);
          expect(res.body[0].author.username).to.be.eql(defaultUser.username);
          done(err);
        });
    });
  });

  describe('POST /api/events/{id}/boards/{id}/replies', () => {
    it('should register a board reply on a board', done => {
      const boardReply = {
        'id': 2,
        'content': 'The second board reply'
      };

      request
        .post('/api/events/1/boards/1/replies')
        .set('x-access-token', token)
        .send(boardReply)
        .end((err, res) => {
          expect(res.body.content).to.be.eql(boardReply.content);
          expect(res.body.boardId).to.be.eql(defaultBoard.id);
          expect(res.statusCode).to.be.eql(201);
          done(err);
        });

    });
  });
});
