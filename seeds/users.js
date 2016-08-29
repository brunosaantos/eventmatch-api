export default (db, md5) => {
  db.users.bulkCreate([{
    'username': 'framos0',
    'password': md5('wrPYBu1ZR'),
    'name': 'Frances Ramos',
    'email': 'framos0@oaic.gov.au',
    'gender': true,
    'birthdate': '8/18/1973'
  }, {
    'username': 'jbailey1',
    'password': md5('xIdZ50UohPoE'),
    'name': 'Janice Bailey',
    'email': 'jbailey1@linkedin.com',
    'gender': false,
    'birthdate': '10/24/1983'
  }, {
    'username': 'jsanders2',
    'password': md5('glM7UpUiDqs'),
    'name': 'Johnny Sanders',
    'email': 'jsanders2@ucoz.ru',
    'gender': false,
    'birthdate': '8/25/1963'
  }, {
    'username': 'kfoster3',
    'password': md5('KHZJZ6mP'),
    'name': 'Kathryn Foster',
    'email': 'kfoster3@bbb.org',
    'gender': false,
    'birthdate': '1/22/1971'
  }, {
    'username': 'jbryant4',
    'password': md5('nBho7g'),
    'name': 'Jack Bryant',
    'email': 'jbryant4@fc2.com',
    'gender': false,
    'birthdate': '11/12/2014'
  }, {
    'username': 'ppayne5',
    'password': md5('6qV6es'),
    'name': 'Phyllis Payne',
    'email': 'ppayne5@dion.ne.jp',
    'gender': false,
    'birthdate': '2/13/2009'
  }, {
    'username': 'lkennedy6',
    'password': md5('s8IpDUuZ'),
    'name': 'Lori Kennedy',
    'email': 'lkennedy6@loc.gov',
    'gender': true,
    'birthdate': '1/13/1967'
  }, {
    'username': 'amiller7',
    'password': md5('jT7KzAX69SLs'),
    'name': 'Andrew Miller',
    'email': 'amiller7@prlog.org',
    'gender': false,
    'birthdate': '6/3/2002'
  }, {
    'username': 'aknight8',
    'password': md5('YDJXb1X'),
    'name': 'Andrew Knight',
    'email': 'aknight8@nba.com',
    'gender': true,
    'birthdate': '10/9/1988'
  }, {
    'username': 'gmedina9',
    'password': md5('PInnnjdzzS9H'),
    'name': 'Gregory Medina',
    'email': 'gmedina9@cnn.com',
    'gender': false,
    'birthdate': '5/23/1981'
  }, {
    'username': 'srosea',
    'password': md5('s9QC24IiXg'),
    'name': 'Samuel Rose',
    'email': 'srosea@cnn.com',
    'gender': false,
    'birthdate': '10/17/1998'
  }, {
    'username': 'bcarterb',
    'password': md5('83HhvVQ'),
    'name': 'Bruce Carter',
    'email': 'bcarterb@pagesperso-orange.fr',
    'gender': true,
    'birthdate': '9/11/1988'
  }, {
    'username': 'nknightc',
    'password': md5('QvT6k4E'),
    'name': 'Nicholas Knight',
    'email': 'nknightc@merriam-webster.com',
    'gender': true,
    'birthdate': '11/3/1970'
  }, {
    'username': 'pwalkerd',
    'password': md5('rCPr8ThnP0aR'),
    'name': 'Philip Walker',
    'email': 'pwalkerd@hp.com',
    'gender': true,
    'birthdate': '10/17/2014'
  }, {
    'username': 'lpowelle',
    'password': md5('ayppJehPQMR'),
    'name': 'Louise Powell',
    'email': 'lpowelle@blogs.com',
    'gender': true,
    'birthdate': '6/12/1965'
  }, {
    'username': 'rstevensf',
    'password': md5('hHJAgnLVJ'),
    'name': 'Raymond Stevens',
    'email': 'rstevensf@shareasale.com',
    'gender': false,
    'birthdate': '8/14/1976'
  }, {
    'username': 'mburnsg',
    'password': md5('alcDyr9K'),
    'name': 'Marie Burns',
    'email': 'mburnsg@icio.us',
    'gender': true,
    'birthdate': '8/19/1999'
  }, {
    'username': 'cfrazierh',
    'password': md5('vj7bOlFeQZK'),
    'name': 'Catherine Frazier',
    'email': 'cfrazierh@nbcnews.com',
    'gender': false,
    'birthdate': '12/10/2002'
  }, {
    'username': 'awallacei',
    'password': md5('wiBmub'),
    'name': 'Aaron Wallace',
    'email': 'awallacei@geocities.com',
    'gender': false,
    'birthdate': '9/15/1961'
  }, {
    'username': 'djacksonj',
    'password': md5('PoqhDrlfxne'),
    'name': 'Douglas Jackson',
    'email': 'djacksonj@ted.com',
    'gender': true,
    'birthdate': '3/20/1963'
  }, {
    'username': 'agonzalesk',
    'password': md5('ihm6tJ6'),
    'name': 'Ashley Gonzales',
    'email': 'agonzalesk@bizjournals.com',
    'gender': false,
    'birthdate': '7/10/1999'
  }, {
    'username': 'drodriguezl',
    'password': md5('rxRVv3npy'),
    'name': 'Deborah Rodriguez',
    'email': 'drodriguezl@epa.gov',
    'gender': false,
    'birthdate': '12/18/1992'
  }, {
    'username': 'hphillipsm',
    'password': md5('GBuf3hbwP9Qh'),
    'name': 'Harry Phillips',
    'email': 'hphillipsm@wordpress.com',
    'gender': false,
    'birthdate': '7/9/1982'
  }, {
    'username': 'smartinn',
    'password': md5('MbX8J5gX1d'),
    'name': 'Samuel Martin',
    'email': 'smartinn@reuters.com',
    'gender': true,
    'birthdate': '1/23/1993'
  }, {
    'username': 'jschmidto',
    'password': md5('w29C6ApBFMz'),
    'name': 'Jane Schmidt',
    'email': 'jschmidto@comsenz.com',
    'gender': true,
    'birthdate': '1/25/1996'
  }, {
    'username': 'fmarshallp',
    'password': md5('QINXUdtE'),
    'name': 'Frances Marshall',
    'email': 'fmarshallp@fastcompany.com',
    'gender': false,
    'birthdate': '9/17/1973'
  }, {
    'username': 'bbennettq',
    'password': md5('XdEgSxrAhygE'),
    'name': 'Brian Bennett',
    'email': 'bbennettq@ovh.net',
    'gender': true,
    'birthdate': '7/30/1979'
  }, {
    'username': 'kcollinsr',
    'password': md5('BAdeTGGBtAZz'),
    'name': 'Kathy Collins',
    'email': 'kcollinsr@wikispaces.com',
    'gender': true,
    'birthdate': '11/2/1999'
  }, {
    'username': 'rbakers',
    'password': md5('WA9Sl6'),
    'name': 'Robin Baker',
    'email': 'rbakers@patch.com',
    'gender': true,
    'birthdate': '8/28/2012'
  }, {
    'username': 'tramirezt',
    'password': md5('bhlcWVr'),
    'name': 'Teresa Ramirez',
    'email': 'tramirezt@linkedin.com',
    'gender': true,
    'birthdate': '9/30/1982'
  }, {
    'username': 'kcrawfordu',
    'password': md5('sxUqYD92QmkX'),
    'name': 'Kevin Crawford',
    'email': 'kcrawfordu@last.fm',
    'gender': true,
    'birthdate': '12/24/1994'
  }, {
    'username': 'jstevensv',
    'password': md5('j15ed431Y'),
    'name': 'Janet Stevens',
    'email': 'jstevensv@auda.org.au',
    'gender': true,
    'birthdate': '12/2/2006'
  }, {
    'username': 'rhenryw',
    'password': md5('fMxj8Wvhny'),
    'name': 'Robin Henry',
    'email': 'rhenryw@t-online.de',
    'gender': false,
    'birthdate': '1/24/1984'
  }, {
    'username': 'scarterx',
    'password': md5('9xeOlCQU5'),
    'name': 'Steven Carter',
    'email': 'scarterx@earthlink.net',
    'gender': false,
    'birthdate': '11/22/1970'
  }, {
    'username': 'rweavery',
    'password': md5('AkkL37jZ'),
    'name': 'Ralph Weaver',
    'email': 'rweavery@csmonitor.com',
    'gender': false,
    'birthdate': '8/31/1997'
  }, {
    'username': 'rfordz',
    'password': md5('JBKwptvke'),
    'name': 'Rachel Ford',
    'email': 'rfordz@ustream.tv',
    'gender': true,
    'birthdate': '6/2/1990'
  }, {
    'username': 'ecruz10',
    'password': md5('MAiFOVi'),
    'name': 'Eric Cruz',
    'email': 'ecruz10@bing.com',
    'gender': false,
    'birthdate': '5/21/1961'
  }, {
    'username': 'cmurphy11',
    'password': md5('cMNtz4N'),
    'name': 'Christopher Murphy',
    'email': 'cmurphy11@ebay.com',
    'gender': false,
    'birthdate': '3/20/1995'
  }, {
    'username': 'cbutler12',
    'password': md5('PX8QvpkPSwzd'),
    'name': 'Charles Butler',
    'email': 'cbutler12@so-net.ne.jp',
    'gender': false,
    'birthdate': '10/25/1987'
  }, {
    'username': 'jhoward13',
    'password': md5('8ZiAoDGo0B'),
    'name': 'Jimmy Howard',
    'email': 'jhoward13@narod.ru',
    'gender': false,
    'birthdate': '2/19/1978'
  }, {
    'username': 'dblack14',
    'password': md5('w7nQwaD'),
    'name': 'Dennis Black',
    'email': 'dblack14@rambler.ru',
    'gender': true,
    'birthdate': '7/13/1992'
  }, {
    'username': 'spalmer15',
    'password': md5('eJKMX05QgEvy'),
    'name': 'Sara Palmer',
    'email': 'spalmer15@weibo.com',
    'gender': true,
    'birthdate': '8/6/2011'
  }, {
    'username': 'slong16',
    'password': md5('8pEGmM23'),
    'name': 'Sarah Long',
    'email': 'slong16@dailymotion.com',
    'gender': false,
    'birthdate': '11/12/2014'
  }, {
    'username': 'rjohnston17',
    'password': md5('0flDzTZldvW'),
    'name': 'Rose Johnston',
    'email': 'rjohnston17@deliciousdays.com',
    'gender': true,
    'birthdate': '5/13/2003'
  }, {
    'username': 'aandrews18',
    'password': md5('uOOMPjWYR1'),
    'name': 'Antonio Andrews',
    'email': 'aandrews18@squarespace.com',
    'gender': false,
    'birthdate': '12/14/2006'
  }, {
    'username': 'lallen19',
    'password': md5('JfIDrS'),
    'name': 'Lois Allen',
    'email': 'lallen19@nih.gov',
    'gender': false,
    'birthdate': '9/28/1966'
  }, {
    'username': 'cjones1a',
    'password': md5('2lOyUZgQu'),
    'name': 'Carol Jones',
    'email': 'cjones1a@cnbc.com',
    'gender': false,
    'birthdate': '5/13/2007'
  }, {
    'username': 'pcarr1b',
    'password': md5('jIbEPK'),
    'name': 'Patrick Carr',
    'email': 'pcarr1b@netscape.com',
    'gender': true,
    'birthdate': '3/24/1983'
  }, {
    'username': 'kcarroll1c',
    'password': md5('rBWZ3okB7IiI'),
    'name': 'Katherine Carroll',
    'email': 'kcarroll1c@deliciousdays.com',
    'gender': false,
    'birthdate': '2/13/1999'
  }, {
    'username': 'sfields1d',
    'password': md5('fOtXcEhl2'),
    'name': 'Steve Fields',
    'email': 'sfields1d@vkontakte.ru',
    'gender': false,
    'birthdate': '1/29/1981'
  }]);
};
