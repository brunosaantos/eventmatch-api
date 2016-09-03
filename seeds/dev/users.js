import md5 from 'md5';

export default (db) => {
  db.users.bulkCreate([{
    'id': 1,
    'username': 'admin',
    'password': md5('123'),
    'name': 'admin',
    'email': 'admin@admin.com',
    'birthdate': '01-01-2000',
    'gender': true
  }]);
};
