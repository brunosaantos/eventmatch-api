describe('Polls', () => {
  const Users   = app.datasource.models.users;
  const Events  = app.datasource.models.events;
  const Polls   = app.datasource.models.polls;
  const Answers = app.datasource.models.answers;

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

  const defaultPoll = {
    'id': 1,
    'question': 'First question',
    'eventId': 1,
    'answers': [
      { 'answer': 'First Answer' },
      { 'answer': 'Second Answer' },
      { 'answer': 'Third Answer' },
      { 'answer': 'Fourth Answer' },
    ]
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
    Polls
      .destroy({where: {}})
      .then(() => {
        Answers
          .destroy({where: {}})
          .then(() => Polls.create(defaultPoll, { include: [{ model: Answers, as: 'answers' }] }))
          .then(() => done());
      });
  });

  describe('GET /api/events/{id}/polls/', () => {
    it('should return a list of polls registered on a event', done => {
      request
        .get('/api/events/1/polls')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].question).to.be.eql(defaultPoll.question);
          done(err);
        });
    });
  });

  describe.only('POST /api/events/{id}/polls/', () => {
    it('should create poll and register to an event', done => {
      const poll = {
        'id': 2,
        'question': 'Second question',
        'eventId': 1,
        'answers': [
          { 'answer': 'First Answer' },
          { 'answer': 'Second Answer' },
          { 'answer': 'Third Answer' },
          { 'answer': 'Fourth Answer' },
        ]
      };

      request
        .post('/api/events/1/polls')
        .set('x-access-token', token)
        .send(poll)
        .end((err, res) => {
          expect(res.body.question).to.be.eql(poll.question);
          expect(res.body.answers[0].answer).to.be.eql(poll.answers[0].answer);
          expect(res.body.answers[1].answer).to.be.eql(poll.answers[1].answer);
          expect(res.body.answers[2].answer).to.be.eql(poll.answers[2].answer);
          expect(res.body.answers[3].answer).to.be.eql(poll.answers[3].answer);
          expect(res.body.answers[3].votes).to.be.eql(0);
          done(err);
        });
    });
  });

});
