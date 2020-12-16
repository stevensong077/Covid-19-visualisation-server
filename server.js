const express = require("express");
const hostname = "localhost";
const port = 3000;
const app = express();
require("./insert.js");
app.get("/", (req, res) => {
  res.send("home");
});

app.get("/page1", (req, res) => {
  res.send("page1");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
