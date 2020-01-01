const { pool } = require('../config');


const getAllTowns = async (req, res, err) => {

    try {
        const result = await pool.query(`SELECT * FROM towns ORDER BY tid ASC`);
       // console.log('result:', result.rows[0].town_name) 
        if (result.rowCount == 0) { res.send({ message: 'Town data unavailable!' })
        }
        else { return res.status(200).send({ status: 'success', data: result.rows, message: 'All towns data retrieved!' });
        }

    } catch (error) { return res.status(404).send({ status: 'failure', error: error }) }
}

const getTownNames = async (req, res, err) => {
    try {
        const result = await pool.query(`SELECT town_name FROM towns`);
        if (result.rowCount == 0) { res.send({ message: 'Sorry we could not find that town!' })
    }
    else { return res.status(200).send({ status: 'success', data: result.rows, message: 'Town data retrieved!' });
    }

    } catch (error) { return res.status(404).send({ status: 'failure', error: error }) }
}

const createTown = async (req, res, err) => {
    const { town_name, state, region } = req.body;

    try {
        const result = await pool.query(`INSERT INTO towns(town_name, state, region) VALUES ($1,$2,$3) RETURNING *`, [town_name, state, region]);
        return res.status(201).send({ status: 'success', data: result.rows, message: `${town_name} data inserted!` });
    }
     catch (error) { res.status(400).send({ status: 'failure', error: error.detail }) }
}

const deleteTown = async (req, res, err) => {
    const town_name = req.params.town_name;
    try {
        const result = await (pool.query(`DELETE FROM towns WHERE town_name = $1`, [town_name]));
        if (result.rowCount == 0) {res.send({ data: result.rows, message: `${town_name} does not exist. Maybe its already deleted?`})}
        else{ return res.status(200).send({ status: 'success', message: `${town_name} town successfully deleted!` })} 
    }
    catch (error) { res.status(400).send({ status: 'failure', error: error }) }

}



module.exports = { getAllTowns, getTownNames, createTown, deleteTown }  