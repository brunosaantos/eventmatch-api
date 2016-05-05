"use strict";

const restify = require("restify");
const db      = require("./models");
const api     = require("./api");

var server = restify.createServer({
  name: "EventMatch",
});

// Using bodyparser for POST Request Parameters
server.use(restify.bodyParser());

// Routes to Function Assaignment
server.get("/api/user/:id", api.user.getOne);
server.get("/api/users", api.user.get);
server.post("/api/users", api.user.post);
server.del("/api/users/:id", api.user.del);

// Creating Tables or Initiating Connections
db
  .sequelize
  .sync()
  .then(function() {
    // Listening in 3030 Port
    server.listen(3030);
    console.log("Server started: http://localhost:3030/");
  });