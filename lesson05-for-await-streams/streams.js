import { createReadStream, createWriteStream } from "fs";

// // Create streams for file reading and writing
const readStream = createReadStream("./data/text.txt", {
  highWaterMark: 100,
});
const writeStream = createWriteStream("./data/text_copy.txt");

// Here is the old way to work with streams
// // Handle reading chunks of data
// readStream.on("data", (chunk) => {
//   console.log("chunk.length", chunk.length);
//   console.log(chunk.toString());
//   writeStream.write(chunk);
// });

// // Handle stream closure
// readStream.on("close", () => {
//   console.log("Readable stream closed.");
//   writeStream.end();
// });

// readStream.on("error", (err) => {
//   console.error('Stream error:', err)
// });


try {
  for await (const chunk of readStream) {
    console.log("chunk.length", chunk.length);
    console.log(chunk.toString());
    writeStream.write(chunk);
  }
  console.log("Readable stream closed.");
  writeStream.end();

} catch (err) {
  console.error('Stream error:', err)
}
