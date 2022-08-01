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


const request = require('request');
const apiEndPoint = "https://api.thecatapi.com/v1/breeds/search?q=";
const exampleSearch = "?q=sib"; // siberian cats
//
// argv to read input & error check
//
const inputWords = process.argv.slice(2);
if (inputWords.length < 1) {
  console.log("ERROR: missing input to breedFetcher!");
  console.log("EXAMPLE: node breedFetcher.js siberian");
  console.log();
  return;
}

request(apiEndPoint + inputWords[0], (error, response, body) => {
  if (error) {
    console.log("Oops!  We have an error accessing the API: \n" + apiEndPoint + '\n');
    console.log('error:', error); // Print the error if one occurred
    
    process.exit();
  }
  
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  if (response.statusCode === 200) {
    const data = JSON.parse(body);
    if (data.length > 0) { // JSON returns as an object, but nested in array - if array is 0 length, no data.
      // console.log(body)
      // console.log(data); // 'data' is an object (uncomment to view key value pairs)
      console.log("You searched for " + inputWords[0] + '\n');
      console.log(data[0].description);
    } else {
      console.log("Oops!\nWe didn't find any feline breeds that matched your search of " + inputWords[0]);
      return;
    }
  } else {
    console.log("ERROR FETCHING DATA: " + response.statusCode);
  }
});