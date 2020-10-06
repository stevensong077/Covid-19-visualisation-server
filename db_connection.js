var mongoose = require("mongoose");

const conn = mongoose.connect("mongodb://localhost:27017/covid", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db = mongoose.connection;
db.on("connected", function() {
  console.log("Connected to database successfully.");
});

db.on("error", function() {
  console.log("failed Connection.");
});

db.on("disconnected", function() {
  console.log("MongoDB connected disconnected.");
});

module.exports = conn;
