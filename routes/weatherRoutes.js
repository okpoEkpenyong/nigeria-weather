const express = require('express');
const router = express.Router();
const database = require('../controllers/weatherController');



router.get('/api/v1/auth/weather/:town_name/', database.getWeatherByTown);



module.exports = router;