const express = require('express');
const router = express.Router();
const database = require('../controllers/townsController');


router.get('/api/v1/auth/town/', database.getTownNames);
router.post('/api/v1/auth/create-town/', database.createTown);
router.delete('/api/v1/auth/towns/:town_name/', database.deleteTown);
router.get('/api/v1/auth/towns/', database.getAllTowns);



module.exports = router;