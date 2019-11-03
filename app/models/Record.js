//Libs
const db = require('../db/db');

//Symbols
const _id = Symbol('id');
const _personId = Symbol('personId');
const _time = Symbol('time');

//Collection name
const COLLECTION_NAME = 'records';

class Record {
  //Constructor
  constructor(personId = null) {
    this[_id] = null;
    this[_personId] = personId;
    this[_time] = new Date();
  }

  //Properties
  //--id
  get id() {
    return this[_id];
  }

  set id(value) {
    this[_id] = value;
  }

  //--personId
  get personId() {
    return this[_personId];
  }

  set personId(value) {
    this[_personId] = value;
  }

  //--time
  get time() {
    return this[_time];
  }

  set time(value) {
    this[_time] = value;
  }

  //Methods
  async save() {
    const id = await db.save(COLLECTION_NAME, this);
    this[_id] = id;
  }
}

module.exports = Record;
