const express = require("express");
const hostname = "localhost";
const port = 3000;
const app = express();
require("./insert.js");
require('./src/apis/covid');
app.get("/", (req, res) => {
  res.send("home");
});

const CovidModel = require("./src/models/covidModel");

app.get("/all", (req, res) => {
  CovidModel.find({}).then((doc) => {
    console.log(doc);
  });
  res.send("page1");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
