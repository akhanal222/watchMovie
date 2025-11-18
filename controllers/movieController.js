"use strict";
const models = require('../models/movieModels');

async function fetchAllgernes(req, res) {
    try {
        const result = await models.getallgernes();
        res.json(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database query error');
    }
};

module.exports = {
    fetchAllgernes
};
