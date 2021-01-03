const mongoose = require("mongoose");
const csv = require("csvtojson");
// let request = require("request");
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
          // console.log(json);
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
// setInterval(()=>setDatabase(), 1000*3600*12);
// function accessData() {
//   return new Promise((resolve, reject) => {
//     request.get(
//       "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwXSqlP56q78lZKxc092o6UuIyi7VqOIQj6RM4QmlVPgtJZfbgzv0a3X7wQQkhNu8MFolhVwMy4VnF/pub?gid=0&single=true&output=csv",
//       (error, response, body) => {
//         if (!error && response.statusCode == 200) {
//           var covidData = body;
//           console.log(covidData)
//           fs.writeFile("./data.csv", covidData, err => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve("./data.csv");
//             }
//           });
//         }
//       }
//     );
//   });
// }

// CovidModel.deleteMany({}, err => {
//   if (err) {
//     console.error();
//     throw err;
//   }
// });

// let postcode3004 = new CovidModel({
//   postcode: 3004,
//   population: 9311,
//   active: 1,
//   cases: 67,
//   rate: 10.7,
//   new: 0,
//   band: 1,
//   data_date: "27/09/2020",
//   file_processed_date: "28/09/2020"
// });
// postcode3004.save().then(doc => {
//   console.log(doc);
// });

// CovidModel.insertMany({
//   postcode: 3004,
//   population: 9311,
//   active: 1,
//   cases: 67,
//   rate: 10.7,
//   new: 0,
//   band: 1,
//   data_date: "27/09/2020",
//   file_processed_date: "28/09/2020"
// })
//   .then(data => {
//     console.log(data);
//     console.log("insert successfully.");
//   })
//   .catch(err => {
//     console.log("failed");
//   });

// CovidModel.find()
//   .then(data => {
//     console.log(data);
//     console.log("insert successfully.");
//   })
//   .catch(err => {
//     console.log("failed");
//   });

// CovidModel.insertMany(json)
//   .then(data => {
//     console.log(data);
//     console.log("insert successfully.");
//   })
//   .catch(err => {
//     console.log("failed");
//   });
