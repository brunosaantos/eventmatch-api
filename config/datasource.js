let env = process.env.NODE_ENV || 'dev';
env = env.trim();

export default {
  database: `eventmatch_${env}`,
  username: 'root',
  password: null,
  host: 'localhost',
  dialect: 'mysql'
};
