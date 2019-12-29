const { pool } = require('../config');


const getAllTowns = async (req, res, err) => {
    try {
        const result = await pool.query(`SELECT town_name FROM towns`);
        res.status(200).send({ status: 'success', data: result.rows, message: 'data retrieved!' });
        console.log(`result:`, result.rows)
    } catch (error) { res.status(404).send({ status: 'failure', error: error}) }
}


module.exports = { getAllTowns }