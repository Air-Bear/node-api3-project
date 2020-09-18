const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const app = express();

app.use(express.json());

app.use(logger);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: "server online"
  });
});

//custom middleware

function logger(req, res, next) {
  var date = new Date();
  console.log(`method: ${req.method} url: ${req.url} time: ${date.toLocaleTimeString()}`);
  next();
}

module.exports = app;
