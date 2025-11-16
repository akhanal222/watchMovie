"use strict";
const express = require("express");
const router = express.Router();

const movieController = require('../controllers/movieController');

router.get("/genres", movieController.fetchAllgernes);
module.exports = router;
