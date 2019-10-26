//Libs
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

//Symbols
const mongoDatabase = Symbol('mongoDatabase');

class db {
  constructor() {
    MongoClient.connect(config.db.url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        throw err;
      } else {
        this[mongoDatabase] = client.db(config.db.database);
      }
    });
  }

  //Properties
  get database() {
    return this[mongoDatabase];
  }
}

module.exports = new db();
