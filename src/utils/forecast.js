
const axios = require('axios').default;
const url = 'http://api.weatherstack.com/current?access_key=9cfe1bfb583426520fc8186e5bbfd6c9';

const forecast = (latitude, longitude, callback) => {
  axios.get(`${url}&query=${latitude},${longitude}`)
    .then((response) => {
      const data = response.data.current;
      if (data) {
        const {weather_descriptions, temperature, precip} = data;
        callback(undefined, `${weather_descriptions[0]} - It is current ${temperature} degrees out. There is ${precip}% chance to rain `);
      } else {
        callback('Invalid weather data')
      }
    })
    .catch((error) => {
      callback(error);
    });
}

module.exports = forecast;

