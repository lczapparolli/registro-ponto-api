//Tested modules
const db = require('../db');

const collection = 'test';

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

    it('should not override object when it already has an id', async () => {
      const model = { param1: 'value 1', param2: 'value 2' };
      //Insert model
      const id = await db.save(collection, model);
      //Updates the model
      model.id = id;
      const newId = await db.save(collection, model);
      expect(newId).toBe(id);
    });
  });

  describe('Find all method', () => {
    it('should have a "findAll" method', () => {
      expect(db.findAll).toBeDefined();
    });

    it('should receive a collection name', async () => {
      await expect(db.findAll()).rejects.toEqual(
        new TypeError('Collection cannot be null')
      );
    });

    it('should return an array', async () => {
      const result = await db.findAll(collection);
      expect(Array.isArray(result)).toBeTruthy();
    });

    it('should return an awway with all items inserted', async () => {
      //clear the collection
      await db.database.collection(collection).drop();
      //insert some items
      const items = [
        { param1: 'value 1', param2: 'value 2' },
        { param1: 'value 3', param2: 'value 4' },
        { param1: 'value 5', param2: 'value 6' }
      ];
      await db.database.collection(collection).insertMany(items);
      //Load inserted items
      const savedItems = await db.findAll(collection);
      //Test conditions
      expect(savedItems.length).toBe(items.length);
      expect(savedItems[0].param1).toBe(items[0].param1);
      expect(savedItems[0].param2).toBe(items[0].param2);
    });
  });
});
