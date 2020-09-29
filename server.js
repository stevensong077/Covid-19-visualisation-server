const express = require("express");
const hostname = "localhost";
const port = 3000;
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Wrold");
});

app.listen(port, () => {
  console.log(`Server running ar http://${hostname}:${port}/`);
});
