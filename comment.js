// Create web server
const express = require("express");
const app = express();
const port = 3000;
// Get data from server
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set template engine
app.set("view engine", "pug");
app.set("views", "./views");
// Set static file
app.use(express.static("public"));
// Set mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/express-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  content: String,
});
// Create model
const Comment = mongoose.model("Comment", commentSchema);
// Create route
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/comment", (req, res) => {
  Comment.find().then((comments) => {
    res.render("comment/index", {
      comments: comments,
    });
  });
});
app.get("/comment/create", (req, res) => {
  res.render("comment/create");
});
app.post("/comment/create", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  });
  comment.save().then(() => {
    res.redirect("/comment");
  });
});
app.get("/comment/:id", (req, res) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render("comment/view", {
      comment: comment,
    });
  });
});
app.get("/comment/:id/delete", (req, res) => {
  Comment.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/comment");
  });
});
app.get("/comment/:id/update", (req, res) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render("comment/update", {
      comment: comment,
    });
  });
});
app.post("/comment/:id/update", (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  }).then(() => {
    res.redirect("/comment");
  });
});
// Listen port
app.listen(port, () =>)
