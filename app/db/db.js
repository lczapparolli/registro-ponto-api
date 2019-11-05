//Libs
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

//Symbols
const _mongoDatabase = Symbol('mongoDatabase');
const _validateCollection = Symbol('validateCollection');
const _validateModel = Symbol('validateModel');

class db {
  constructor() {
    this[_mongoDatabase] = null;
  }

  //Properties
  get database() {
    return this[_mongoDatabase];
  }

  //Methods
  async init() {
    if (!this[_mongoDatabase]) {
      const client = await MongoClient.connect(config.db.url, {
        useUnifiedTopology: true
      });
      this[_mongoDatabase] = client.db(config.db.database);
    }
  }

  async save(collection, model) {
    this[_validateCollection](collection);
    this[_validateModel](model);
    await this.init();
    if (model.id) {
      return this.update(collection, model);
    } else {
      return this.insert(collection, model);
    }
  }

  async insert(collection, model) {
    const result = await this[_mongoDatabase]
      .collection(collection)
      .insertOne(model);
    if (result.insertedCount === 1) return result.insertedId;
    else throw new Error('Error inserting object');
  }

  async update(collection, model) {
    const result = await this[_mongoDatabase]
      .collection(collection)
      .replaceOne({ _id: model.id }, model);
    if (result.modifiedCount == 1) return model.id;
    else throw new Error('Error updating object');
  }

  //Private methods
  [_validateCollection](collection) {
    if (!collection) throw new TypeError('Collection cannot be null');
  }

  [_validateModel](model) {
    if (!model) throw new TypeError('Model cannot be null');
  }
}

module.exports = new db();
