// this is running JS outside the browser
console.log("Hello Node!");
console.log("Installed npm i --save-dev nodemon and other dependency!");
console.log("nodemon keeps refreshing the file when updating the server!");

//this module transfer data over the Hyper Text Transfer Protocol
const http = require("http");

// creating the ports
const hostname = "127.0.0.1";
const port = 3000;

// creating my first server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write('<h1 style="color: red">Hello World!</h1>');
  res.write("<p>I wonder what else we can send...</p>");
  res.end();
});

// listening for communicating
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}: and ${port}/`);
});

// this is a test
console.log("This is a test to finish ");
