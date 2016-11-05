let env = process.env.NODE_ENV || 'dev';
env = env.trim();

export const database = {
  database: `eventmatch_${env}`,
  username: 'bruno',
  password: 'senac',
  params: {
    host: 'database',
    dialect: 'mysql'
  }
};

export const secretToken = 'secretToken';

export default {
  database,
  secretToken
};
