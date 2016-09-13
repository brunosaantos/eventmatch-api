import moment           from 'moment';
import EventsController from '../../../controllers/events';

moment.locale('pt-br');

describe('Events Controller', () => {

  const decodedToken = {
    id: 1,
    username: 'admin',
    iat: 1473191712,
    exp: 1504727712
  };

  const invalidDecodedToken = {
    id: 2,
    username: 'admin',
    iat: 1473191712,
    exp: 1504727712
  };

  describe('Get all events: get()', () => {
    it('should return a list of events', () => {
      const Models = {
        events: { findAll: td.function() },
        users: { findAll: td.function() }
      };

      const rawResponse = [{
        id: 1,
        name: 'test event',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      }];

      const expectedResponse = [{
        id: 1,
        name: 'test event',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        dateCalendar: moment('2016-07-07T00:00:00.000Z').calendar(),
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      }];

      td.when(Models.events.findAll({include: [{ all: true }]})).thenResolve(rawResponse);

      const eventsController = new EventsController(Models);
      return eventsController.get()
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Get a event: getOne()', () => {
    it('should return a event', () => {
      const Models = {
        events: { findOne: td.function() },
        users: { findOne: td.function() }
      };

      const rawResponse = {
        id: 1,
        name: 'test event',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      const expectedResponse = {
        id: 1,
        name: 'test event',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        dateCalendar: moment('2016-07-07T00:00:00.000Z').calendar(),
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      td.when(Models.events.findOne({where: {id: 1}, include: [{ all: true }]})).thenResolve(rawResponse);

      const eventsController = new EventsController(Models);
      return eventsController.getOne({id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create an event: post()', () => {
    it('should create an event', () => {
      const Models = {
        events: { create: td.function() },
        users: { create: td.function() }
      };

      const postBody = {
        id: 1,
        name: 'event test',
        date: '2016-07-07T00:00:00.000Z',
        type: ''
      };

      const rawResponse = {
        id: 1,
        name: 'event test',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      const expectedResponse = {
        id: 1,
        name: 'event test',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        dateCalendar: moment('2016-07-07T00:00:00.000Z').calendar(),
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      td.when(Models.events.create(postBody)).thenResolve(rawResponse);

      const eventsController = new EventsController(Models);
      return eventsController.post(postBody)
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
          expect(response.statusCode).to.be.eql(201);
        });
    });
  });

  describe('Update an event: put()', () => {
    it('should update an event', () => {
      const Models = {
        events: { update: td.function() },
        users: { update: td.function() }
      };

      const postBody = {
        id: 1,
        name: 'event test updated',
        date: '2016-07-07T00:00:00.000Z',
        type: ''
      };

      const rawResponse = {
        id: 1,
        name: 'event test updated',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      const expectedResponse = {
        id: 1,
        name: 'event test updated',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        dateCalendar: moment('2016-07-07T00:00:00.000Z').calendar(),
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      td.when(Models.events.update(postBody, {where: {id: 1}})).thenResolve(rawResponse);

      const eventsController = new EventsController(Models);
      return eventsController.put(decodedToken, postBody, {id: 1})
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
        });
    });

    it('should return an forbidden error', () => {
      const Models = {
        events: { update: td.function() },
        users: { update: td.function() }
      };

      const postBody = {
        id: 1,
        name: 'event test updated',
        date: '2016-07-07T00:00:00.000Z',
        type: ''
      };

      const rawResponse = {
        id: 1,
        name: 'event test updated',
        address: null,
        addressName: null,
        date: '2016-07-07T00:00:00.000Z',
        type: '',
        price: null,
        classification: null,
        description: null,
        lat: null,
        lng: null,
        createdAt: '2016-09-06T20:44:07.000Z',
        updatedAt: '2016-09-06T20:44:07.000Z'
      };

      td.when(Models.events.update(postBody, {where: {id: 1}})).thenResolve(rawResponse);

      const eventsController = new EventsController(Models);
      expect(eventsController.put(invalidDecodedToken, postBody, {id: 1}).data).to.be.eql({error: 'Forbidden'});
      expect(eventsController.put(invalidDecodedToken, postBody, {id: 1}).statusCode).to.be.eql(403);
    });
  });

  describe('Delete an event: del()', () => {
    it('should delete an event', () => {
      const Models = {
        events: { destroy: td.function() },
        users: { destroy: td.function() }
      };

      const expectedResponse = {};

      td.when(Models.events.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const eventsController = new EventsController(Models);
      return eventsController.del(decodedToken, {id: 1})
        .then(response => {
          expect(response.data).to.be.eql(expectedResponse);
          expect(response.statusCode).to.be.eql(204);
        });
    });

    it('should return an forbidden error', () => {
      const Models = {
        events: { destroy: td.function() },
        users: { destroy: td.function() }
      };

      const expectedResponse = {};

      td.when(Models.events.destroy({where: {id: 1}})).thenResolve(expectedResponse);

      const eventsController = new EventsController(Models);
      expect(eventsController.del(invalidDecodedToken, {id: 1}).data).to.be.eql({error: 'Forbidden'});
      expect(eventsController.del(invalidDecodedToken, {id: 1}).statusCode).to.be.eql(403);
    });
  });
});
