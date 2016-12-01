describe('Raffles', () => {
  const Users = app.datasource.models.users;
  const Events = app.datasource.models.events;
  const Raffles = app.datasource.models.raffles;

  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': 'S3nac@2016',
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '01-01-2000',
    'gender': true
  };

  const user2 = {
    'id': 2,
    'username': 'bruno',
    'password': 'S3nac@2016',
    'name': 'bruno',
    'email': 'bruno@bruno.com',
    'birthdate': '01-01-2000',
    'gender': true
  };

  const defaultEvent = {
    'id'  : 1,
    'name': 'test event',
    'date': '2016-07-07',
    'type': ''
  };

  const defaultRaffle = {
    'id': 1,
    'eventId': 1,
    'winnerId': 1
  };

  let token = null;

  before(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => request.post('/api/login').send({username: defaultUser.username, password: defaultUser.password}))
      .then(res => token = res.body.token)
      .then(() => Users.create(user2))
      .then(() => {
        Events
          .destroy({where: {}})
          .then(() => {
            return Events.create(defaultEvent)
              .then(event => {
                event.addUsers(1, {admin: true});
                event.addUsers(2, {admin: false});

                return event;
              })
              .then(() => done());
          });
      });
  });

  beforeEach(done => {
    Raffles.destroy({where: {}})
      .then(() => Raffles.create(defaultRaffle))
      .then(() => done());
  });

  describe('GET /api/events/{id}/raffles/', () => {
    it('should return a list of raffles registered on an event', done => {
      request
        .get('/api/events/1/raffles')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].winner.username).to.be.eql(defaultUser.username);
          done(err);
        });
    });
  });

  describe('POST /api/events/{id}/raffles', () => {
    it('should register a raffle reply on an event', done => {
      const raffle = {
        'id': 2,
        'title': 'some title'
      };

      request
        .post('/api/events/1/raffles')
        .set('x-access-token', token)
        .send(raffle)
        .end((err, res) => {
          expect(res.body.eventId).to.be.eql(defaultEvent.id);
          expect(res.body.winnerId).to.be.eql(user2.id);
          expect(res.statusCode).to.be.eql(201);
          done(err);
        });

    });
  });
});
