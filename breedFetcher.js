const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  const url = `http://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request(url, (error, resp, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (resp && resp.statusCode > 400) {
      callback(`Error. Status code: ${resp.statusCode}`, null);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback(`Error. The breed '${breedName}' was not found`, null);
    } else {
      callback(null, data[0].description);
    }

  });
};

module.exports = { fetchBreedDescription };