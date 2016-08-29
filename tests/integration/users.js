describe('Users', () => {
  const defaultUser = {
    'id': 1,
    'username': 'admin',
    'password': '202cb962ac59075b964b07152d234b70',
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '2016-01-01T02:00:00.000Z',
    'gender': true,
    'createdAt': '2016-08-28T23:18:47.000Z',
    'updatedAt': '2016-08-28T23:18:47.000Z'
  };

  describe('Route GET /users', () => {
    it('should return a list of users', done => {
      request
        .get('/api/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].username).to.be.eql(defaultUser.username);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          expect(res.body[0].birthdate).to.be.eql(defaultUser.birthdate);
          expect(res.body[0].gender).to.be.eql(defaultUser.gender);
          done(err);
        });
    });
  });
});
