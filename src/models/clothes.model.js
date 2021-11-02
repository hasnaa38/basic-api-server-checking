'use strict';

const sequelize = require('sequelize');
const { DataTypes } = require('sequelize'); 

const Clothes = (sequelize) => sequelize.define('Clothes', {
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
    }
});

module.exports = Clothes;
