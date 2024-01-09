console.log("This is working with REST API");
const express = require("express");

const users = require("./data/user");
const posts = require("./data/post");

const app = express();
const PORT = 3006;

// this middleware for a REST API that must be set up all time to work for different data body
app.use(express.json()); // this is control & brings data in
app.use(express.urlencoded({ extended: true }));

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
    ${time.toLocaleTimeString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// the original main route
app.get("/", (req, res) => {
  res.send("Working with REST API");
});

/**
 * Creating a GET route for the entire users database.
   This would be impractical in larger data sets sent to the user in json.
 */
// app.get("/api/users", (req, res) => {
//   res.json(users);
// });

// to read the users
app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username is taken" });
        return;
      }
      // create a new user object
      const user = {
        id: users[users.length - 1].id + 1, // increasing the user id
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      // pushing the new user
      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "insufficient data" });
  });

/**
 * @method GET /api/:id
 * @param :id
 * getting single ids enter numbers in router
 */
app
  .route("/api/users/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next(); // to call the error
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

// ============= post method ==========
/**
 * Get /api/posts main post API route
 */
app
  .route("/api/posts")
  .get((req, res) => {
    res.json(posts);
  })
  .post((req, res) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

///////

// GET all posts adding next parameter for error
app.get("/api/posts/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
  else next();
});

// 404 this is to catch a wrong route must add next
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: "Resource, Page, Route Not Found" });
});

app.listen(PORT, () => {
  console.log("Port Server 3006");
});
