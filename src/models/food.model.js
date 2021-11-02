'use strict';

//----- Step 3: creating the model

/* 
define is a sequelize method for creating new tables
define contains the table's name and schema
the schema should define the data type, its not optional, each column should have a type
*/

const Food = (sequelize, DataTypes) => sequelize.define('Food', {
    item: { // the name column
        type: DataTypes.STRING,
        allowNull: false // optional, we can't insert a row to our table without a fist name
    },
    calories: { // the calories column
        type: DataTypes.STRING
    }
});

// exporting the model/schema for creating the Food table
module.exports = Food;