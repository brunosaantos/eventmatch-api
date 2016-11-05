'use strict';

import fs from 'fs';
const api = {};

fs
  .readdirSync(__dirname)
  .forEach((file) => {
    if (file == 'index.js') return;

    let name = file.substr(0, file.indexOf('.'));
    api[name] = require('./' + name);
  });

export default api;
