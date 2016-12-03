let env = process.env.NODE_ENV || 'dev';
env = env.trim();

const username = process.env.EM_DB_USERNAME || 'root';
const password = process.env.EM_DB_PASSWORD || '';
const host     = process.env.EM_DB_HOST || 'localhost';
const port     = process.env.EM_DB_PORT || 3306;

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
