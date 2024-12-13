import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';


export default function testStreams() {
  // // Create streams for file reading and writing
  // const readStream = createReadStream("./data/text.txt", {
  //   highWaterMark: 100,
  // });
  // const writeStream = createWriteStream("./data/text_copy.txt");

  // // Handle reading chunks of data
  // readStream.on('data', (chunk) => {
  //   console.log('chunk.length', chunk.length);
  //   console.log(chunk.toString());
  //   writeStream.write(chunk);
  // });

  // // Handle stream closure
  // readStream.on('close', () => {
  //   console.log('Readable stream closed.');
  //   writeStream.end();
  // });


  // Compression and pipe example
  const readStream2 = createReadStream('./data/text.txt');
  const writeStream2 = createWriteStream('./data/text.zip');
  const gzip = createGzip();

  // Pipe data through gzip and into the output file
  readStream2.pipe(gzip).pipe(writeStream2);
};
