const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class TicketsController {
  constructor (Models) {
    this.events = Models.events;
    this.tickets = Models.tickets;
  }

  get (params) {
    return this.events
      .findOne({ where: { id: params.id } }, { include: [{model: this.users}]})
      .then(event => {
        return event.getTickets({ include: [ {all: true} ]})
          .then(tickets => defaultResponse(tickets))
          .catch(error => errorResponse(error.errors));
      });
  }

  create (decodedToken, params, data) {
    // @TODO: Verificar se o usuário que está criando o ticket
    // é admin do evento.

    // data.authorId = decodedToken.id;

    return this.events
      .findOne({where: {id: params.id}})
      .then(event => {
        return event.createTicket(data)
          .then(ticket => defaultResponse(ticket, 201))
          .catch(error => errorResponse(error.errors));
      })
      .catch(error => errorResponse(error.errors));
  }
}

export default TicketsController;
