const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyCWpT9Fj4MqLU0uvWViNfKzX4YacdXy1ho';

async function getCoordsForAddress(address) {
  return {
    lat: 40.7484474,
    lng: -73.9871516
  };
  const response = await axios.get(
    `http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=${address}`
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //   address
    // )}&key=${API_KEY}`

    
  );
console.log(response)
  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
