const express = require("express");
const hostname = "localhost";
const port = 4000;
const app = express();
const setDB = require("./setDatabase.js");
const setLocation = require("./setLocation.js");
const bodyParser = require("body-parser");

const CovidModel = require("./src/models/covidModel");
const LocationModel = require("./src/models/locationModel");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("home");
});

app.get("/all", (req, res) => {
  CovidModel.find({}).then((doc) => {
    res.send(doc);
  });
});

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/postcode", jsonParser, (req, res) => {
  let post = req.body.postcode;
  LocationModel.find({ postcode: post }).then((doc) => {
    res.send(
      doc.map((val) => ({
        name: val.place_name,
        lat: val.latitude,
        lng: val.longitude,
      }))
    );
  });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setLocation.setLocation();
  setDB.setDatabase();
  setInterval(() => setDB.setDatabase(), 1000 * 3600 * 2);
});
