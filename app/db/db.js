//Libs
const MongoClient = require('mongodb').MongoClient;

//Constants
const url = 'mongodb://localhost:27017'; 
const dbName = 'registro-ponto';

//Symbols
const mongoDatabase = Symbol('mongoDatabase');

class db {
    constructor() {
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                throw err;
            } else {
                this[mongoDatabase] = client.db(dbName);
            }
        });
    }

    //Properties
    get database() {
        //return this[mongoDatabase];
    }
}

module.exports = new db();