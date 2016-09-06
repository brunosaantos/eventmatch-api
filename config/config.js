let env = process.env.NODE_ENV || 'dev';
env = env.trim();

export const database = {
  database: `eventmatch_${env}`,
  username: 'root',
  password: null,
  host: 'localhost',
  dialect: 'mysql'
};

export const secretToken = 'secretToken';

export default {
  database,
  secretToken
};
