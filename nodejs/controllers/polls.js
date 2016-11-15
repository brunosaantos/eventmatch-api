const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class PollsController {
  constructor (Models) {
    this.events = Models.events;
    this.polls  = Models.polls;
    this.answers = Models.answers;
  }

  get (params) {
    return this.events
      .findOne({ where: { id: params.id } })
      .then(event => {
        return event.getPolls()
          .then(polls => defaultResponse(polls))
          .catch(error => errorResponse(error.errors));
      });
  }

  create (params, data) {
    data.answers.forEach(answer => delete answer.votes);

    return this.events
      .findOne({where: {id: params.id}})
      .then(event => {
        return event.createPoll(data, { include: [{ model: this.answers, as: 'answers' }] })
          .then(poll => defaultResponse(poll, 201))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }

  vote (params) {
    const eventId = params.id;
    const pollId = params.pollId;
    const answerId = params.answerId;

    return this.events
      .findOne({where: {id: eventId}})
      .then(event => {
        return event.getPolls({where: {id: pollId}})
          .then(polls => polls[0].getAnswers({where: {id: answerId}}))
          .then(answers => answers[0])
          .then(answer => answer.increment('votes'))
          .then(answer => answer.reload())
          .then(answer => defaultResponse(answer, 201))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }


  //
  // getReplies (params) {
  //   return this.boards
  //     .findOne({ where: { id: params.boardid } })
  //     .then(board => {
  //       return board.getReply()
  //         .then(replies => defaultResponse(replies))
  //         .catch(error => errorResponse(error.errors));
  //     })
  //     .catch(error => errorResponse(error.errors));
  // }
  //
  // createReply (decodedToken, params, data) {
  //   data.authorId = decodedToken.id;
  //
  //   return this.boards
  //     .findOne({where: {id: params.boardid}})
  //     .then(board => {
  //       return board.createReply(data)
  //         .then(boardReply => defaultResponse(boardReply, 201))
  //         .catch(error => errorResponse(error.errors));
  //     })
  //     .catch(error => errorResponse(error.errors));
  // }
}

export default PollsController;
