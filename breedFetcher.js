//
// LHL - Cats As A Service
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m02w5/activities/426?journey_step=34&workbook=8
// 2022-08-01
//

//
// REFERENCES:
// https://thecatapi.com/
// https://docs.thecatapi.com/
//

const fetchBreedDescription = function(breedName, callback) {
  //
  // setup function variables
  //
  const request = require('request');
  const apiEndPoint = "https://api.thecatapi.com/v1/breeds/search?q=";

  //
  // access API
  //
  request(apiEndPoint + breedName, (error, response, body) => {
    if (error) {
      callback(error,"Oops!  We have an error accessing the API: \n" + apiEndPoint + '\n');
    }

    //
    // process response & output data
    //
    if (response.statusCode === 200) {
      const data = JSON.parse(body);
      if (data.length > 0) { // JSON returns as an object, but nested in array - if array is 0 length, no data.
        // console.log(body)
        // console.log(data); // 'data' is an object (uncomment to view key value pairs)
        const searchResult = "You searched for " + breedName + '\n' + constrainText(data[0].description,60);
        callback(null,data[0].description);
      } else {
        callback("Not Found","Oops!\nWe didn't find any feline breeds that matched your search of " + breedName);
        return;
      }
    } else {
      callback(response.statusCode, "ERROR FETCHING DATA: " + response.statusCode);
    }
  });
};


const constrainText = function(inputText,textLength) {
  let outputString = '';
  for (let x = 0; x <= inputText.length; x ++) {
    // if x is a multiple of textLength add \n.
    if ((x % textLength) === 0) {
      outputString += '\n';
    }
    outputString += inputText.charAt(x);
  }
  return outputString;
};

module.exports = { fetchBreedDescription };