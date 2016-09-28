export default (db) => {
  db.events.bulkCreate([{
    'name': 'test event',
    'address': null,
    'addressName': null,
    'date': '2016-07-07',
    'type': '',
    'price': null,
    'classification': null,
    'description': null,
    'lat': null,
    'lng': null
  },
  {
    'name': 'Fenadoce 2',
    'address': 'Av. Presidente Goulart, s/n - Fragata, Pelotas - RS, 96025-060, Brasil',
    'addressName': 'Fenadoce',
    'date': '2016-09-13',
    'type': 'feira',
    'price': null,
    'classification': null,
    'description': null,
    'lat': -31.728781,
    'lng': -52.383034
  },
  {
    'name': 'Fenadoce',
    'address': 'Av. Presidente Goulart, s/n - Fragata, Pelotas - RS, 96025-060, Brasil',
    'addressName': 'Fenadoce',
    'date': '2016-09-12',
    'type': 'feira',
    'price': null,
    'classification': null,
    'description': 'Descrição',
    'lat': -31.728781,
    'lng': -52.383034
  },
  {
    'name': 'test event',
    'address': null,
    'addressName': null,
    'date': '2016-07-07',
    'type': '',
    'price': null,
    'classification': null,
    'description': null,
    'lat': null,
    'lng': null
  },
  {
    'name': 'test event',
    'address': null,
    'addressName': null,
    'date': '2016-07-07',
    'type': '',
    'price': null,
    'classification': null,
    'description': null,
    'lat': null,
    'lng': null
  },
  {
    'name': 'fenadoce',
    'address': null,
    'addressName': null,
    'date': '2016-07-07',
    'type': 'outros',
    'price': null,
    'classification': null,
    'description': null,
    'lat': null,
    'lng': null
  }]);
};
