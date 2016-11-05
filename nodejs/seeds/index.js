import users from './users';
import md5 from 'md5';

export default (db) => {
  users(db, md5);
};
