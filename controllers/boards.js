const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class BoardsController {
  constructor (Models) {
    this.events = Models.events;
    this.boards = Models.boards;
  }

  get (params) {
    return this.events
      .findOne({ where: { id: params.id } }, { include: [{model: this.users}]})
      .then(event => {
        return event.getBoards({ include: [ {all: true} ]})
          .then(boards => defaultResponse(boards))
          .catch(error => errorResponse(error.errors));
      });
  }

  create (decodedToken, params, data) {
    data.authorId = decodedToken.id;

    return this.events
      .findOne({where: {id: params.id}})
      .then(event => {
        return event.createBoard(data)
          .then(board => defaultResponse(board, 201))
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

export default BoardsController;
