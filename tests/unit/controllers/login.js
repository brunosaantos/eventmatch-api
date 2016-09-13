import LoginController from '../../../controllers/login';

describe('Login Controller', () => {

  describe('Login: post()', () => {
    it('should return a token and a user', () => {
      const Users = {
        find: td.function()
      };

      const PostBody = {
        username: 'admin',
        password: '123'
      };

      const rawResponse = {
        id: 1,
        username: 'admin',
        password: '123',
        name: 'admin',
        email: 'admin@admin.com',
        birthdate: '2000-01-01T02:00:00.000Z',
        gender: true,
        createdAt: '2016-09-12T19:02:09.000Z',
        updatedAt: '2016-09-12T19:02:09.000Z',
        dataValues: {
          id: 1,
          username: 'admin',
          password: '123',
          name: 'admin',
          email: 'admin@admin.com',
          birthdate: '2000-01-01T02:00:00.000Z',
          gender: true,
          createdAt: '2016-09-12T19:02:09.000Z',
          updatedAt: '2016-09-12T19:02:09.000Z'
        }
      };

      const expectedResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTQ3MzgwMDg2NCwiZXhwIjoxNTA1MzM2ODY0fQ.KCS0GYzJSx5Vva_mQvgtvvy44ymUIlo_pSEEJotX_zI',
        user: {
          id: 1,
          username: 'admin',
          name: 'admin',
          email: 'admin@admin.com',
          birthdate: '2000-01-01T02:00:00.000Z',
          gender: true,
          createdAt: '2016-09-12T19:02:09.000Z',
          updatedAt: '2016-09-12T19:02:09.000Z'
        }
      };

      td.when(Users.find({where: PostBody})).thenResolve(rawResponse);

      const logincontroller = new LoginController(Users);
      return logincontroller.post(PostBody)
        .then(response => {
          expect(response.data.user.username).to.be.eql(expectedResponse.user.username);
          expect(response.data).to.include.keys('token');
        });
    });

    it('should return an error', () => {
      const Users = {
        find: td.function()
      };

      const PostBody = {
        username: 'admin',
        password: '123'
      };

      const rawResponse = null;

      const expectedResponse = {
        error: 'Nome de usuário e/ou senha inválidos'
      };

      td.when(Users.find({where: PostBody})).thenResolve(rawResponse);

      const logincontroller = new LoginController(Users);
      return logincontroller.post(PostBody)
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });
});
