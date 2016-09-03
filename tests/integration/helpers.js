import supertest from 'supertest';
import chai      from 'chai';
import app       from '../../index';

global.app     = app;
global.request = supertest(app.server);
global.expect  = chai.expect;
