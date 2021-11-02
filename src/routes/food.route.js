'use strict';

const express = require('express'); // to use express router constructor method
const { Food } = require('../models/index'); // the instance connection from index.js

const foodRouter = express.Router();

// Routes declaration 
foodRouter.get('/food', getFoods);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

// functions
async function getFoods(req, res) {
    console.log(Food);
    const allFood = await Food.findAll();
    res.status(200).json(allFood);
}

async function getOneFood(req, res) {
    let id = parseInt(req.params.id);
    let foundFood = await Food.findOne({ where: { id: id } });
    res.status(200).json(foundFood);
}

async function createFood(req, res) {
    let details = req.body;
    let newFood = await Food.create(details);
    res.status(201).json(newFood);
}

async function updateFood(req, res) {
    let id = parseInt(req.params.id);
    let details = req.body;
    let foundFood = await Food.findOne({ where: { id: id } });
    let updatedFood = await foundFood.update(details);
    res.status(201).json(updatedFood);
}

async function deleteFood(req, res) {
    let id = parseInt(req.params.id);
    let deletedFood = await Food.destroy({ where: { id: id } });
    res.status(204).json(deletedFood);
}

module.exports = foodRouter;