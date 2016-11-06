let env = process.env.NODE_ENV || 'dev';
env = env.trim();

let username = (env == 'prod') ? 'bruno' : 'root';
let password = (env == 'prod') ? 'senac' : '';
let host = (env == 'prod') ? 'database' : 'localhost';

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
