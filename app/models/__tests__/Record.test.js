//Tested module
const Record = require('../Record');

const RealDate = Date;

function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(isoDate);
    }
  };
}

describe('Record module', () => {
  afterEach(() => {
    global.Date = RealDate;
  });

  describe('Model structure', () => {
    it('shoud have a `personId` and a `time` properties', () => {
      const model = new Record();
      expect(model.personId).toBeDefined();
      expect(model.time).toBeDefined();
    });

    it('should receive `personId` as parameter and `time` should be now', () => {
      //Test params
      const personId = 'identification';
      const isoDate = '2019-10-26T12:00:00.000Z';
      //Mocking datetime
      mockDate(isoDate);
      //Creating object
      const model = new Record(personId);
      //Test conditions
      expect(model.personId).toBe(personId);
      expect(model.time.toISOString()).toBe(isoDate);
    });
  });

  describe('Model save', () => {
    it('should have a `save` action', async () => {
      //Creating model
      const model = new Record('identification');
      expect(model.save).toBeDefined();
    });

    it('should insert a model into database if it is new', async () => {
      //Creating model
      const model = new Record('identification');
      //Inserting model into database
      await model.save();
      expect(model._id).toBeDefined();
      expect(model._id).not.toBeNull();
    });

    it('should not change id if object is already into database', async () => {
      //Creating model
      const model = new Record('identification');
      //Inserting model into database
      await model.save();
      const id = model._id;
      //Saving it again
      await model.save();
      expect(model._id).toBe(id);
    });
  });
});
