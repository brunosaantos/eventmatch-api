let env = process.env.NODE_ENV || 'dev';
env = env.trim();

const username = (env == 'prod') ? 'bruno' : 'root';
const password = (env == 'prod') ? 'senac' : '';
const host = (env == 'prod') ? 'database' : 'localhost';

export const database = {
  database: `eventmatch_${env}`,
  username,
  password,
  params: {
    host,
    dialect: 'mysql'
  }
};

export const secretToken = 'secretToken';

export default {
  database,
  secretToken
};
