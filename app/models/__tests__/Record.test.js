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
    it('Shoud have a `personId` and a `time` properties', () => {
      const model = new Record();
      expect(model.personId).toBeDefined();
      expect(model.time).toBeDefined();
    });

    it('Should receive `personId` as parameter and `time` should be now', () => {
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

  describe('Model actions', () => {
    it('Should have a `save` action', async () => {
      //Creating model
      const model = new Record('identification');
      expect(model.save).toBeDefined();
      await model.save();
      expect(model.id).toBeDefined();
      expect(model.id).not.toBeNull();
    });
  });
});
