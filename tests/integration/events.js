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
      .then(() => Users.create(defaultUser))
      .then(() => request.post('/api/login').send({username: defaultUser.username, password: defaultUser.password}))
      .then(res => token = res.body.token)
      .then(() => {
        Events
          .destroy({where: {}})
          .then(() => {
            return Events.create(defaultEvent)
              .then(event => event.addUsers(1, {admin: true}));
          })
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

  describe('GET /api/events/{id}/users', () => {
    it('should return a list of users registered on the event', done => {
      request
        .get('/api/events/1/users')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          done(err);
        });
    });
  });

  describe('POST /api/events/{id}/users', () => {
    it('should register an user on the event', done => {
      const user = {
        'id': 2,
        'username': 'bruno',
        'password': '123',
        'name': 'bruno',
        'email': 'bruno@bruno.com',
        'birthdate': '01-01-2000',
        'gender': true
      };

      // create the user
      request
        .post('/api/users')
        .send(user)
        .then(user => {
          // log the user to get the token
          request
            .post('/api/login')
            .send({username: user.username, password: user.password})
            .then(res => {
              // register the new user on the event
              request
                .post('/api/events/1/users')
                .set('x-access-token', res.body.token)
                .send()
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(201);
                  done(err);
                });
            });
        });

    });
  });


});
