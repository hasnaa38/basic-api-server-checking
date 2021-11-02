'use strict';

const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json()); // to decrypt data actually parses the payload coming from the request inside the body so we can perform operations

// Starting the server function
const PORT = process.env.PORT || 3001;
function start() {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
}
// Proof of life
app.get('/', (req, res) => {
    res.status(200).send('Hello :) Server Running Successfully');
})

// Table 1 - to make the >> food << table routers usable
const foodRouter = require('./routes/food.route');
app.use(foodRouter);

// Table 2 - to make the >> clothes << table routers usable
const clothesRouter = require('./routes/clothes.route');
app.use(clothesRouter);

// Error handlers
const errorHandler_404 = require('./error-handlers/404');
const errorHandler_500 = require('./error-handlers/500');
app.use('*', errorHandler_404);
app.use(errorHandler_500);

// Middleware
const logger = require('./middleware/logger');
app.use(logger);

module.exports = { app, start }
