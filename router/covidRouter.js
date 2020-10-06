const CovidModel = require("../model/covidModel");
const express = require("express");
const router = express.Router();


router.post("/getone", (req, res) => {
  let { code } = req.body;
  CovidModel.find({ postcode: code })
    .then(data => {
      console.log(data);
      console.log("find successfully.");
      res.send(data);
    })
    .catch(err => {
      console.log("failed");
    });
});

module.exports = router;

router.get("/getall",(req, res) => { 
  CovidModel.find()
    .then(data => {
      console.log(data);
      console.log("find successfully.");
      res.send(data);
    })
    .catch(err => {
      console.log("failed");
    });
})

// function getdata(code) {
//   CovidModel.find({ postcode: code })
//     .then(data => {
//       console.log(data);
//       console.log("find successfully.");
//     })
//     .catch(err => {
//       console.log("failed");
//     });
// }

// getdata(3000)