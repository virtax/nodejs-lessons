import { createServer } from "http";

// Define the server port
const PORT = 3000;

// Create the server
const server = createServer((req, res) => {
  // Handle routes
  if (req.url === "/" && req.method === "GET") {
    // Set response headers
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello ");
    res.end("World!");
  } else if (req.url === "/about" && req.method === "GET") {
    // Set response headers
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
