'use strict';
const loggerMiddleware = require('../src/middleware/logger');

describe('logger test', () => {
    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn();

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('Check if the console is logging the outputs', async () => {
        loggerMiddleware(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('Check if the code is properly moving to the next middleware', async() => {
        loggerMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
})