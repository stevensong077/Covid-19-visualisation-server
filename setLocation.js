const connection = require("./db_connection");
const mongoose = require("mongoose");
const LocationModel = require("./src/models/covidModel");
const file = require("./location.json");
const fs = require("fs");

const setLocation = async () => {
//   await fsreadFile(file, (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     const json = JSON.parse(data);
//   });

//   db.Location.insert(json, function (err, doc) {
//     console.log(data);
//     if (err) throw err;
//   });
};

exports.setLocation = setLocation;
