import users from './users';
import roles from './roles';

export default (db) => {
  users(db);
  roles(db);
};
