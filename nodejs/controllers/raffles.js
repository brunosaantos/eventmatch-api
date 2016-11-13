const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class RafflesController {
  constructor (Datasource) {
    this.datasource = Datasource;

    this.events  = Datasource.models.events;
    this.users   = Datasource.models.users;
    this.raffles = Datasource.models.raffles;
  }

  get (params) {
    return this.events
      .findOne({ where: { id: params.id } }, { include: [{model: this.users}]})
      .then(event => {
        return event.getRaffles({ include: [ {all: true} ]})
          .then(raffles => defaultResponse(raffles))
          .catch(error => errorResponse(error.errors));
      });
  }

  create (decodedToken, params, data) {
    // return this.datasource.sequelize.query(
    //     `select * from users_has_events where eventId = ${params.id} AND admin = 1`,
    //     { type: this.datasource.sequelize.QueryTypes.SELECT}
    //   )
    //   .then(users => users[Math.floor(Math.random() * users.length)])
    //   .then(user => console.log('winner', user))
    return this.events
      .findOne({ where: { id: params.id } }, { include: [{model: this.users}]})
      .then(event => {
        return event.getUsers({
          order: [ this.datasource.Sequelize.fn( 'RAND' ) ],
          raw: true
        })
        .then(users => users.filter(user => user['users_has_events.admin'] == 0))
        .then(users => users[Math.floor(Math.random() * users.length)])
        .then(user => event.createRaffle(Object.assign(data, {winnerId: user.id})))
        .then(raffle => defaultResponse(raffle, 201))
        .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }

  getReplies (params) {
    return this.boards
      .findOne({ where: { id: params.boardId } })
      .then(board => {
        return board.getReply({ include: [ { all: true }] })
          .then(replies => defaultResponse(replies))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }

  createReply (decodedToken, params, data) {
    data.authorId = decodedToken.id;

    return this.boards
      .findOne({where: {id: params.boardId}})
      .then(board => {
        return board.createReply(data)
          .then(boardReply => defaultResponse(boardReply, 201))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }
}

export default RafflesController;
