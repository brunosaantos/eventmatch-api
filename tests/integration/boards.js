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
    'userId': 1
  };

  const defaultBoardReply = {
    'id': 1,
    'content': 'Reply to: Lorem ipsum dolor sit amet'
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
            .then(board => board.createReply(defaultBoardReply));
          });
      })
      .then(() => done());
  });

  describe('GET /api/events/{id}/boards/{id}/replies', () => {
    it('should return a list of board replies registered on a board', done => {
      request
        .get('/api/events/1/boards/1/replies')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].content).to.be.eql(defaultBoardReply.content);
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
