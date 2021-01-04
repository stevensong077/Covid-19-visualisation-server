const express = require("express");
const hostname = "localhost";
const port = 3000;
const app = express();
const setDB = require("./setDatabase.js");
const CovidModel = require("./src/models/covidModel");
// import cors from 'cors';
require("./src/apis/covid");
// app.use(cors())
app.get("/", (req, res) => {
  res.send("home");
});

// const CovidModel = require("./src/models/covidModel");
app.get("/all", (req, res) => {
  CovidModel.find({}).then((doc) => {
    console.log(doc);
    res.send(doc);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setDB.setDatabase();
  setInterval(() => setDB.setDatabase(), 1000 * 3600 * 12);
  // setInterval(() => setDB.setDatabase(), 1000 * 10);
});
