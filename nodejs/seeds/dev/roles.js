export default (db) => {
  db.roles.bulkCreate([{
    'id': 1,
    'name': 'admin'
  },{
    'id': 2,
    'name': 'confirmado'
  }]);
};
