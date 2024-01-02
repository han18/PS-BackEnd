// this is running JS outside the browser
console.log("Hello Node!");
console.log("Installed npm i --save-dev nodemon!");
console.log("nodemon keeps refreshing the file when updating the server!");

const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World Calling From a Node Server!\n");
});

res.status = server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// this is a test
console.log("This is a test to finish ");
