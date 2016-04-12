var restify = require("restify");
var port = process.env.PORT || 3000;
var users = {
  get: function (req, res, next) {
    console.log("users.get method")
  }
};


var server = restify.createServer({
  name: "Eventmatch server"
});

server.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  return next();
});

server.use(restify.bodyParser());

server.get("api/users", users.get);

server.listen(port, function () {
  console.log("api running at: " + port);
});