//Libs
const request = require('supertest');
//Tested module
const app = require('../index');

describe('App server', () => {
    it('responds with "It is alive!" at home', async () => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('It is alive!');
        app.close();
    });
});