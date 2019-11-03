//Libs
const MongoClient = require('mongodb').MongoClient;
const config = require('./app/config');

const jestSetup = async () => {
  const client = await MongoClient.connect(config.db.url, {
    useUnifiedTopology: true
  });
  const db = client.db(config.db.database);
  await db.dropDatabase();
  await client.close();
};

module.exports = jestSetup;
