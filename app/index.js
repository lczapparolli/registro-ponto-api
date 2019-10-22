const express = require('express');
const config = require('./config');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('It is alive!');
});

module.exports = app.listen(config.port);
