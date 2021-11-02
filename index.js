'use strict';

const { start } = require('./src/server');
 
//----- Step 5: connect to the database
// Note: the sync command is a promise
// Note: we first connect to the database, then we connect to the server.
const { db } = require('./src/models/index'); 
db.sync().then(() => {
    start(); // the server will start after connecting to the database
}).catch(console.error);