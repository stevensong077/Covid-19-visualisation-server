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

router.get("/getall", (req, res) => {
  CovidModel.find()
    .then(data => {
      console.log(data);
      console.log("find successfully.");
      res.send(data);
    })
    .catch(err => {
      console.log("failed");
    });
});

router.get("/test", (req, res) => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park"
    }
  ];
  res.send(data);
});
