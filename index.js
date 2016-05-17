"use strict";

const restify = require("restify");
const db      = require("./models");
const api     = require("./api");

var server = restify.createServer({
  name: "EventMatch",
});

// Using bodyparser for POST Request Parameters
server.use(restify.bodyParser());

// CORS
server.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Routes to User
server.get("/api/user/:id", api.user.getOne);
server.get("/api/users", api.user.get);
server.post("/api/users", api.user.post);
server.del("/api/user/:id", api.user.del);

// Routes to Login
server.post("/api/login", api.login.post);

// Creating Tables or Initiating Connections
db
  .sequelize
  .sync({force: true})
  .then(function() {
    // Listening in 3030 Port
    server.listen(3030);
    console.log("Server started: http://localhost:3030/");
  });