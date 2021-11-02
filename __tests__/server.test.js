'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');

// Creating a connection
beforeAll(async () => {
    await db.sync();
});

// Dropping the connection after finishing
afterAll(async () => {
    await db.drop();
});

describe('Web server', () => {

    // Check if 404 errors are handled 
    test('Should respond with 404 status on an invalid method', async () => {
        const response = await mockRequest.get('/not-a-path');
        expect(response.status).toBe(404);
    });

    // Testing the POST request (if it can create a food)
    test('POST requests work fine -> Can add a new food', async () => {
        const response = await mockRequest.post('/food').send({
            item: "potato",
            calories: "283"
        });
        expect(response.status).toBe(201);
    });

    // Testing the GET request (if it can respond with all the foods)
    it('GET requests work fine -> Can get all foods', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);
    });

    // Testing the GET request for one item (if it can read one item only)
    it('a single item GET requests work fine -> Can get a single record', async () => {
        const response = await mockRequest.get('/food/1');
        expect(response.status).toBe(200);
    });

    // Testing the PUT request (if it can update an item)
    it('PUT requests work fine -> Can update a record', async () => {
        const response = await mockRequest.put('/food/1').send({
            item: 'potato',
            calories: '383'
        });
        expect(response.status).toBe(201);
    });

    // Testing the DELETE request (if it can delete an item)
    it('can delete a record', async () => {
        const response = await mockRequest.delete('/food/1');
        expect(response.status).toBe(204);
    });

});