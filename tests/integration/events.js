import md5 from 'md5';

describe('Events', () => {
  const Users = app.datasource.models.users;
  const Events = app.datasource.models.events;

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

  let token = null;

  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(Object.assign({}, defaultUser, {password: md5(defaultUser.password)})))
      .then(() => request.post('/api/login').send({username: defaultUser.username, password: defaultUser.password}))
      .then(res => token = res.body.token)
      .then(() => {
        Events
          .destroy({where: {}})
          .then(() => Events.create(defaultEvent))
          .then(() => {
            done();
          });
      });

  });

  describe('GET /events', () => {
    it('should return a list of events', done => {
      request
        .get('/api/events')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultEvent.name);
          done(err);
        });
    });
  });

  describe('GET /events?embed=users', () => {
    it('should return a list of events with users', done => {
      request
        .get('/api/events?embed=users')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultEvent.name);
          expect(res.body[0]).to.include.keys('users');
          done(err);
        });
    });
  });

  describe('GET /events/1', () => {
    it('should return the event with id = 1', done => {
      request
        .get('/api/events/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultEvent.id);
          expect(res.body.name).to.be.eql(defaultEvent.name);
          done(err);
        });
    });
  });

  describe('GET /events/1?embed=users', () => {
    it('should return the event with id = 1 and include users', done => {
      request
        .get('/api/events/1?embed=users')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultEvent.id);
          expect(res.body.name).to.be.eql(defaultEvent.name);
          expect(res.body).to.include.keys('users');
          done(err);
        });
    });
  });

  describe('POST /api/events', () => {
    it('should create a event', done => {
      const event = {
        'id'  : 2,
        'name': 'novo test event',
        'date': '2016-07-07',
        'type': ''
      };

      request
        .post('/api/events')
        .set('x-access-token', token)
        .send(event)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(event.id);
          expect(res.body.name).to.be.eql(event.name);
          done(err);
        });
    });
  });

  describe('PUT /api/events/{id}', () => {
    it('should update a event', done => {
      const defaultEventUpdated = {
        'id': 1,
        'name': 'test event updated',
        'date': '2016-07-07',
        'type': ''
      };

      request
        .put('/api/events/1')
        .set('x-access-token', token)
        .send(defaultEventUpdated)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('DELETE /api/events/{id}', () => {
    it('should delete a event', done => {
      request
        .delete('/api/events/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.be.eql(204);
          done(err);
        });
    });
  });




});
