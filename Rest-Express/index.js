console.log("This is working with REST API");
const express = require("express");

const users = require("./data/user");
const posts = require("./data/post");

const app = express();
const PORT = 3006;

// the is a middleware for a REST API must be set up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the original main route
app.get("/", (req, res) => {
  res.send("Working with REST API");
});

/**
 * Creating a GET route for the entire users database.
   This would be impractical in larger data sets sent to the user in json.
 */
app.get("/api/users", (req, res) => {
  res.json(users);
});

app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "User is taken" });
        return;
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "insufficient data" });
  });

/**
 * @method GET /api/:id
 * @param :id
 */
app.get("/api/users/:id", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json(user);
  else next(); // to call the error
});

// ============= post method ==========
/**
 * this is a post route
 */
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
});

// this is to catch a wrong route
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: "Resource, Page, Route Not Found" });
});

app.listen(PORT, () => {
  console.log("Port Server 3006");
});
