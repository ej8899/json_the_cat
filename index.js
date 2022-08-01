const { fetchBreedDescription } = require('./breedFetcher');

const breedName = process.argv[2];


fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error + '\n' + desc);
    process.exit();
  } else {
    console.log(desc);
  }
});