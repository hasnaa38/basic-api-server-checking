'use strict';

const express = require('express');
const { Clothes } = require('../models/index');

const clothesRouter = express.Router();

clothesRouter.get('/clothes', getAll);
clothesRouter.get('/clothes/:id', getClothingItem);
clothesRouter.post('/clothes', createClothingItem);
clothesRouter.put('/clothes/:id', updateClothingItem);
clothesRouter.delete('/clothes/:id', deleteClothingItem);

async function getAll(req, res) {
    let allClothes = await Clothes.findAll();
    res.status(200).json(allClothes);
}

async function getClothingItem(req, res) {
    let id = parseInt(req.params.id);
    let item = await Clothes.findOne({ where: { id: id } });
    res.status(200).json(item);
}

async function createClothingItem(req, res) {
    let details = req.body;
    let newItem = await Clothes.create(details);
    res.status(201).json(newItem);
}

async function updateClothingItem(req, res) {
    let id = parseInt(req.params.id);
    let details = req.body;
    let foundItem = await Clothes.findOne({ where: { id: id } });
    let updatedItem = await foundItem.update(details);
    res.status(201).json(updatedItem);
}

async function deleteClothingItem(req, res) {
    let id = parseInt(req.params.id);
    let deletedItem = await Clothes.destroy({ where: { id: id } });
    res.status(204).json(deletedItem);
}

module.exports = clothesRouter;