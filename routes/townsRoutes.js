const express = require('express');
const router = express.Router();
const database = require('../controllers/townsController');


router.get('/api/v1/towns', database.getAllTowns);



module.exports = router;