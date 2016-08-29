import supertest from 'supertest';
import chai      from 'chai';
import server    from '../../index';

global.server  = server;
global.request = supertest(server);
global.expect  = chai.expect;
