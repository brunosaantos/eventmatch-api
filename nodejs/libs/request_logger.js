import bunyan        from 'bunyan';
import Bunyan2Loggly from 'bunyan-loggly';
import restify       from 'restify';

const logglyConfig = {
  token: (process.env.EM_LOGGLY_TOKEN || 'token'),
  subdomain: (process.env.EM_LOGGLY_SUBDOMAIN || 'subdomain')
};

const logglyStream = new Bunyan2Loggly(logglyConfig);

export default bunyan.createLogger({
  name: 'request-logger',
  level: (process.env.EM_LOG_LEVEL || 100),
  serializers: restify.bunyan.serializers,
  streams: [{
    path: './logs/request.log',
  }, {
    type: 'raw',
    stream: logglyStream
  }]
});
