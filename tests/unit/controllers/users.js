import UsersController from '../../../controllers/user';

describe('Users Controller', () => {

  const decodedToken = {
    id: 1,
    username: 'admin',
    iat: 1473191712,
    exp: 1504727712
  };

  const invalidDecodedToken = {
    id: 2,
    username: 'admin',
    iat: 1473191712,
    exp: 1504727712
  };

  describe('Get all users: get()', () => {
    it('should return a list of users', () => {
      const Users = {
        findAll: td.function()
      };

      const rawResponse = [{
        id: 1,
        username: 'admin',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      }];

      const expectedResponse = [{
        id: 1,
        username: 'admin',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      }];

      td.when(Users.findAll({})).thenResolve(rawResponse);

      const usersController = new UsersController(Users);
      return usersController.get()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a user: getOne()', () => {
    it('should return a user', () => {
      const Users = {
        findOne: td.function()
      };

      const rawResponse = {
        id: 1,
        username: 'admin',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      const expectedResponse = {
        id: 1,
        username: 'admin',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      td.when(Users.findOne({where: {id: 1}})).thenResolve(rawResponse);

      const usersController = new UsersController(Users);
      return usersController.getOne({id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a user: post()', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function()
      };

      const postBody = {
        id: 1,
        username: 'admin',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      const expectedResponse = {
        id: 1,
        username: 'admin',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      td.when(Users.create(postBody)).thenResolve(postBody);

      const usersController = new UsersController(Users);
      return usersController.post(postBody)
        .then(response => {
          expect(response.data.id).to.be.eql(expectedResponse.id);
          expect(response.data.username).to.be.eql(expectedResponse.username);
          expect(response.data.password).to.be.undefined;
          expect(response.data.name).to.be.eql(expectedResponse.name);
          expect(response.data.email).to.be.eql(expectedResponse.email);
          expect(response.data.birthdate).to.be.eql(new Date(expectedResponse.birthdate));
          expect(response.data.gender).to.be.eql(expectedResponse.gender);
          expect(response.data.createdAt).to.be.eql(expectedResponse.createdAt);
          expect(response.data.updatedAt).to.be.eql(expectedResponse.updatedAt);
        });
    });
  });

  describe('Update a user: put()', () => {
    it('should update a user', () => {
      const Users = {
        update: td.function()
      };

      const postBody = {
        id: 1,
        username: 'admin updated',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true
      };

      const expectedResponse = {
        id: 1,
        username: 'admin updated',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      td.when(Users.update(postBody, {where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.put(decodedToken, postBody, {id: 1})
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return a forbidden error', () => {
      const Users = {
        update: td.function()
      };

      const postBody = {
        id: 1,
        username: 'admin updated',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true
      };

      const expectedResponse = {
        id: 1,
        username: 'admin updated',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-06T03:56:22.000Z',
        updatedAt: '2016-09-06T03:56:22.000Z'
      };

      td.when(Users.update(postBody, {where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      expect(usersController.put(invalidDecodedToken, postBody, {id: 1}).data).to.be.eql({error: 'Forbidden'});
      expect(usersController.put(invalidDecodedToken, postBody, {id: 1}).statusCode).to.be.eql(403);
    });
  });

  describe('Delete a user: del()', () => {
    it('should delete a user', () => {
      const Users = {
        destroy: td.function()
      };

      const expectedResponse = {};

      td.when(Users.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.del(decodedToken, {id: 1})
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
          expect(response.statusCode).to.be.eql(204);
        });
    });

    it('should return a forbidden error', () => {
      const Users = {
        destroy: td.function()
      };

      const expectedResponse = {};

      td.when(Users.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      expect(usersController.del(invalidDecodedToken, {id: 1}).data).to.be.eql({error: 'Forbidden'});
      expect(usersController.del(invalidDecodedToken, {id: 1}).statusCode).to.be.eql(403);
    });
  });
});
