const request = require('request-promise');
require('dotenv').config();
const { pool } = require('../config')


const getWeatherByTown = async (req, res, err) => {
    const town = req.params.town_name
    const TownResult = await pool.query(`SELECT town_name FROM towns WHERE town_name = $1`, [town]); 
    try {
      if (TownResult.rowCount == 0){
        res.send({message: `'Sorry we could not find that town!`})
      }
      else {
       const WeatherResult = await request({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${town}&APPID=${process.env.WEATHER_API_KEY}&units=imperial`, json: true});
      if (WeatherResult.sys.country != 'NG') {
        res.send({message: `${town} is not a Nigerian town. Only valid Nigerian towns are accepted!`})}
       else { return res.send(WeatherResult);}}
    } catch (error) { res.send({error: 'An error occurred.Pls check the town or connection!'})}
}




module.exports = { getWeatherByTown }