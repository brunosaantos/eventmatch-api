import md5 from 'md5';

describe('Users', () => {
  const Users = app.datasource.models.users;
  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': '123',
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '01-01-2000',
    'gender': true
  };

  let token = null;

  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => request.post('/api/login').send({username: defaultUser.username, password: defaultUser.password}))
      .then(res => {
        token = res.body.token;
      })
      .then(() => {
        done();
      });
  });

  describe('GET /users', () => {
    it('should return a list of users', done => {
      request
        .get('/api/users')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].username).to.be.eql(defaultUser.username);
          expect(res.body[0].password).to.be.undefined;
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          expect(new Date(res.body[0].birthdate).toString()).to.be.eql(new Date(defaultUser.birthdate).toString());
          expect(res.body[0].gender).to.be.eql(defaultUser.gender);
          done(err);
        });
    });
  });

  describe('GET /users/1', () => {
    it('should return the user with id = 1', done => {
      request
        .get('/api/users/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.username).to.be.eql(defaultUser.username);
          expect(res.body.password).to.be.undefined;
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          expect(new Date(res.body.birthdate).toString()).to.be.eql(new Date(defaultUser.birthdate).toString());
          expect(res.body.gender).to.be.eql(defaultUser.gender);
          done(err);
        });
    });
  });

  describe('POST /api/users', () => {
    it('should create a user', done => {
      const user = {
        'id': 2,
        'username': 'bruno',
        'password': '123',
        'name': 'bruno',
        'email': 'bruno@bruno.com',
        'birthdate': '01-01-2000',
        'gender': true
      };

      request
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(user.id);
          expect(res.body.username).to.be.eql(user.username);
          expect(res.body.password).to.be.undefined;
          expect(res.body.name).to.be.eql(user.name);
          expect(res.body.email).to.be.eql(user.email);
          expect(new Date(res.body.birthdate).toString()).to.be.eql(new Date(user.birthdate).toString());
          expect(res.body.gender).to.be.eql(user.gender);
          done(err);
        });
    });

    describe('PUT /api/users/{id}', () => {
      it('should update a user', done => {
        const defaultUserUpdated = {
          'id': 1,
          'username': 'adminUpdated',
          'password': '123',
          'name': 'admin',
          'email': 'admin@admin.com',
          'birthdate': '01-01-2000',
          'gender': true
        };

        request
          .put('/api/users/1')
          .set('x-access-token', token)
          .send(defaultUserUpdated)
          .end((err, res) => {
            expect(res.body).to.be.eql([1]);
            done(err);
          });
      });
    });

    describe('DELETE /api/users/{id}', () => {
      it('should delete a user', done => {
        request
          .delete('/api/users/1')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.be.eql(204);
            done(err);
          });
      });
    });

    describe('POST /api/users/{id}/changePassword', () => {
      const passwords = {
        old: defaultUser.password,
        new: '1234'
      };

      it('should change the user password', done => {
        request
          .post('/api/users/1/changePassword')
          .set('x-access-token', token)
          .send(passwords)
          .end((err, res) => {
            expect(res.body.password).to.be.eql(md5(passwords.new));
            done(err);
          });
      });
    });
  });
});
