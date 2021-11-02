'use strict';

/* 
- it Performs a console.log with the request method and path
- Import this into your server and set it up to run at the application level for all routes
*/

function logger(req, res, next) {
    console.log('REQUEST: ', req.method, req.path);
    next();
}

module.exports = logger;
