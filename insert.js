const CovidModel = require("./model/covidModel");
const csv = require("csvtojson");
let connection = require("./db_connection");
let request = require("request");
const fs = require("fs");

function accessData() {
  return new Promise((resolve, reject) => {
    request.get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwXSqlP56q78lZKxc092o6UuIyi7VqOIQj6RM4QmlVPgtJZfbgzv0a3X7wQQkhNu8MFolhVwMy4VnF/pub?gid=0&single=true&output=csv",
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var covidData = body;
          fs.writeFile("./data.csv", covidData, err => {
            if (err) {
              reject(err);
            } else {
              resolve("./data.csv");
            }
          });
        }
      }
    );
  });
}

async function insertData() {
  csv()
    .fromFile("./data.csv")
    .then(json => {
      CovidModel.insertMany(json)
        .then(data => {
          console.log(data);
          console.log("insert successfully.");
        })
        .catch(err => {
          console.log("failed");
        });
    });
}

async function setDatabase() {
  fs.exists("./data.csv", async exist => {
    if (!exist) {
      await accessData();
      insertData();
    }
    else {
       fs.unlink("./data.csv", err => {
        if (err) {
          console.error();
          throw err;
        }
        console.log("csv file has been deleted.");
      });
       CovidModel.deleteMany({}, err => {
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
}


setInterval(()=>setDatabase(), 1000*3600*12);


