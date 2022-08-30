const axios = require('axios').default;

const accessToken =
  'pk.eyJ1IjoiZ2x5bXBlIiwiYSI6ImNrNjJmMzNiZzBjZHAzb3ExbHFuYmZ0dGUifQ.-o1NExAwERBZV_vUaK35RA';

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const geoCode = (address, callback) => {
  axios
    .get(
      `${geocodeUrl}/${encodeURIComponent(
        address
      )}.json?proximity=ip&types=place&access_token=${accessToken}&limit=1`
    )
    .then(({ data: { error, features } }) => {
      if (error) {
        callback('Invalid location');
      } else if (features && features.length > 0) {
        const data = {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          location: features[0].place_name,
        };

        callback(undefined, data);
      } else {
        callback('No location found');
      }
    })
    .catch((error) => {
      if (error.response) {
        return callback(error.response.data);
      }
      callback(error);
    });
};

module.exports = geoCode;
