//Tested modules
const db = require('../db');

describe('DB module', () => {
  it('should have a "database" property', async () => {
    expect(db).not.toBeNull();
    await db.init();
    expect(db.database).toBeDefined();
    expect(db.database).not.toBeNull();
  });

  describe('Save method', () => {
    it('should have a "save" method', () => {
      expect(db.save).toBeDefined();
    });

    it('should receive a colection name and a model', async () => {
      //Validates the presence of collection name
      await expect(db.save()).rejects.toEqual(
        new TypeError('Collection cannot be null')
      );
      //Validates the presence of a model
      await expect(db.save('collectionTest')).rejects.toEqual(
        new TypeError('Model cannot be null')
      );
    });

    it('should store the model into the collection', async () => {
      //Test parameters
      const collection = 'test';
      const model = { param1: 'value 1', param2: 'value 2' };
      //Insert model
      const id = await db.save(collection, model);
      //Id should be a string
      expect(id).toBeDefined();
      expect(id).not.toBeNull();
      //Test if collection has one item
      const list = await db.database
        .collection(collection)
        .find({})
        .toArray();
      expect(list).toBeDefined();
      expect(list).not.toBeNull();
      expect(list.length).toBe(1);
      expect(list[0].param1).toBe(model.param1);
    });
  });
});
