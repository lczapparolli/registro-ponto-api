const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('It is alive!');
});

app.listen(3000);

module.exports = app;