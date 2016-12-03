let env = process.env.NODE_ENV || 'dev';
env = env.trim();

const username = process.env.EM_DB_USER || 'root';
const password = process.env.EM_DB_PASS || '';
const host = process.env.EM_DB_HOST || 'localhost';

export const database = {
  database: `eventmatch_${env}`,
  username,
  password,
  params: {
    host,
    dialect: 'mysql',
    logging: false
  }
};

export const secretToken = 'secretToken';

export default {
  database,
  secretToken
};
