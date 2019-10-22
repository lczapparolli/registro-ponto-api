//Tested modules
const db = require('../db');

describe('DB module', () => {
  it('should have a "database" property', () => {
    expect(db).not.toBeNull();
    expect(db.database).not.toBeNull();
  });
});
