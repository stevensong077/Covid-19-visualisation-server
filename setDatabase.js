const csv = require("csvtojson");
const fs = require("fs");
const connection = require("./db_connection");
const axios = require("axios");
const CovidModel = require("./src/models/covidModel");

const accessData = async () => {
  await axios
    .get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwXSqlP56q78lZKxc092o6UuIyi7VqOIQj6RM4QmlVPgtJZfbgzv0a3X7wQQkhNu8MFolhVwMy4VnF/pub?gid=0&single=true&output=csv"
    )
    .then((response) =>
      // console.log(response.data),
      fs.writeFile("./data.csv", response.data, (err) => {})
    )
    .catch((error) => console.log(error));
};

const insertData = async () => {
  await csv()
    .fromFile("./data.csv")
    .then((json) => {
      CovidModel.insertMany(json)
        .then((json) => {
          console.log("Insert data successfully.");
        })
        .catch((err) => {
          console.log("failed");
        });
    });
};

const setDatabase = async () => {
  fs.exists("./data.csv", async (exist) => {
    if (!exist) {
      await accessData();
      await insertData();
    } else {
      await fs.unlink("./data.csv", (err) => {
        if (err) {
          console.error();
          throw err;
        }
        console.log("csv file has been deleted.");
      });
      await CovidModel.deleteMany({}, (err) => {
        if (err) {
          console.error();
          throw err;
        }
        console.log("data in db has been deleted.");
      });
      await accessData();
      insertData();
    }
  });
};

exports.setDatabase = setDatabase;
