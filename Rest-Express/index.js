console.log("This is working with REST API");
const express = require("express");

const users = require("./data/user");
const posts = require("./data/post");

const app = express();
const PORT = 3006;

/**
 * this is a get route
 */
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json(user);
});

app.get("/", (req, res) => {
  res.send("Working with REST API");
});

app.listen(PORT, () => {
  console.log("Port Server 3006");
});
