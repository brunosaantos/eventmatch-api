"use strict";

const fs  = require("fs");
const api = {};

fs
  .readdirSync(__dirname)
  .forEach((file) => {
    if (file == "index.js") return;

    let name = file.substr(0, file.indexOf('.'));
    api[name] = require("./" + name);
  });

module.exports = api;