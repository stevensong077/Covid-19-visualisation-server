const express = require("express");
const hostname = "localhost";
const port = 4000;
const app = express();
const setDB = require("./setDatabase.js");
const setLocation = require("./setLocation.js");

const CovidModel = require("./src/models/covidModel");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("home");
});

// const CovidModel = require("./src/models/covidModel");
app.get("/all", (req, res) => {
  CovidModel.find({}).then((doc) => {
    // console.log(doc);
    res.send(doc);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setLocation.setLocation();
  setDB.setDatabase();
  setInterval(() => setDB.setDatabase(), 1000 * 3600 * 12);
  // setInterval(() => setDB.setDatabase(), 1000 * 10);
});
