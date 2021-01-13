const connection = require("./db_connection");
const LocationModel = require("./src/models/locationModel");
const file = require("./location.json");

const setLocation = async () => {
  LocationModel.count({}, (error, count) => {
    if (count === 0) {
      LocationModel.insertMany(file, (error, doc) => {
        console.log(doc);
        if (error) throw err;
      });
    }
  });
};

exports.setLocation = setLocation;
