'use strict';
//----- Step 1: setting up the connection for the database

/* 
connects to our database depending through the uri that is based upon the environment we are using. Two options: 
1- url is postgres if the env was development or production
2- sqlite if the env was test
*/
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

// require both the datatype and sequelize constructor from the sequelize package
const { Sequelize, DataTypes } = require('sequelize'); // 

// configuring the connection options for production ONLY
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: { // means we need to connect the server and the database through a ssl connection (secure)
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

//----- Step 2: create a new connection to the database
// our connection object, used to connect to postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

//----- Step 4: to create an instance of the food model exported from food.model.js (step 3)
const food = require('./food.model');
/* we will export it and pass the sequelize connection we created with its url and options (to create the table
inside the database we are connecting to) and the data types so we can use them (in js, we don't have data types, so
we will use the data types constructors from sequelize to be able to use them in the table columns) */

const clothes = require('./clothes.model');

// we will use the models in our routes
// we connect to our database from the main index.js
module.exports = {
    db: sequelize,
    Food: food(sequelize, DataTypes), // this step is used to create a new table: food
    Clothes: clothes(sequelize)
};