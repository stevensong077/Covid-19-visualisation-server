const express = require("express");
const hostname = "localhost";
const port = 3000;
const app = express();
const bodypaser = require('body-parser');
const connection = require("./db_connection");

app.get("/", (req, res) => {
  res.send("Hello Wrold");
});

app.listen(port, () => {
  console.log(`Server running ar http://${hostname}:${port}/`);
});



app.use(bodypaser.urlencoded({ extended: false }))
app.use(bodypaser.json());

let covidRouter = require('./router/covidRouter');
app.use("/covid", covidRouter);
