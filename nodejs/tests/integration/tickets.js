describe('Boards', () => {
  const Users = app.datasource.models.users;
  const Events = app.datasource.models.events;
  const Tickets = app.datasource.models.tickets;

  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': 'S3nac@2016',
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

  const defaultTicket = {
    'id': 1,
    'type': 'Estudante',
    'price': 15.00,
    'eventId': 1
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
    Tickets
      .destroy({where: {}})
      .then(() => Tickets.create(defaultTicket))
      .then(() => done());
  });

  describe('GET /api/events/{id}/tickets/', () => {
    it('should return a list of tickets registered on an event', done => {
      request
        .get('/api/events/1/tickets')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].type).to.be.eql(defaultTicket.type);
          expect(res.body[0].price).to.be.eql(defaultTicket.price);
          done(err);
        });
    });
  });

  describe('POST /api/events/{id}/tickets', () => {
    it('should register a ticket on an event', done => {
      const ticket = {
        'id': 2,
        'type': 'The second ticket',
        'price': 30.00
      };

      request
        .post('/api/events/1/tickets')
        .set('x-access-token', token)
        .send(ticket)
        .end((err, res) => {
          expect(res.body.type).to.be.eql(ticket.type);
          expect(res.body.price).to.be.eql(ticket.price);
          expect(res.statusCode).to.be.eql(201);
          done(err);
        });

    });
  });
});
