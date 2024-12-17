// Import required modules
import fs from 'fs';
import { pipeline } from 'stream';
import { Transform } from 'stream';

// Paths to the input and output files
const inputFilePath = './data/input.txt';
const outputFilePath = './data/output.txt';

// Create read and write streams
const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath);

// Transform stream to convert text to uppercase
const toUpperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Convert data to uppercase
    const converted = chunk.toString().toUpperCase();
    console.log(converted);
    this.push(converted);
    callback(new Error('test error'));
  }
});

// Connect streams using pipe
// readStream.pipe(toUpperCaseTransform).on('error', (err)=>{
//   console.error(err.message);
// }).pipe(writeStream);

// Use pipeline to process streams
pipeline(
  readStream,           // Read data from the file
  toUpperCaseTransform, // Transform the data
  writeStream,          // Write to another file
  (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Processing completed successfully!');
    }
  }
);
