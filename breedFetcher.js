const request = require('request');

// collect user input "breed"
const breedName = process.argv.slice(2);

// combine user input "breed" with url
const url = `http://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

// collect data
request(url, (error, resp, body) => {
  // if error, generate message & return
  if (error) {
    console.log(`Error: `, error);
    return;
  }

  // if status code is 400+, generate error message & return
  if (resp && resp.statusCode > 400) {
    console.log(`Error. Status code: ${resp.statusCode}`);
    return;
  }

  // turn body information ('string') into object
  const data = JSON.parse(body);

  // if data is empty (ie breed not in database), return error
  if (data.length === 0) {
    console.log(`Error. The breed '${breedName}' was not found`);
  } else {
    // return breed data
    console.log(data[0]);
  }

});