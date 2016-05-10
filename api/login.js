"use strict";

const restify = require("restify");
const db      = require("../models");

// POST: /api/login
exports.post = (req, res, next) => {
  db
    .users
    .find({
      where: req.body
    })
    .then((user) => {
      if (!user) {
        return next(new restify.UnauthorizedError("Invalid username or password"));
      };

      res.send(user);
      return next();
    })
    .catch((err) => res.send({}));
};
