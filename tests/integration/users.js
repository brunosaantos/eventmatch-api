describe('Users', () => {
  const Users = app.db.users;
  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': '123',
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '01-01-2000',
    'gender': true
  };

  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', done => {
      request
        .get('/api/users')
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

  describe('Route GET /users/1', () => {
    it('should return the user with id = 1', done => {
      request
        .get('/api/user/1')
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
});
