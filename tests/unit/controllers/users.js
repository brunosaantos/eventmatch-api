import UsersController from '../../../controllers/user';

describe('Users Controller', () => {
  describe('Get all users: get()', () => {
    it('should return a list of users', () => {
      const Users = {
        findAll: td.function()
      };

      const expectedResponse = [{
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

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.get()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
});
