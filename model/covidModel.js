let mongoose = require("mongoose");

let CovidSchema = new mongoose.Schema({
  postcode: { type: Number, required: true },
  population: Number,
  active: Number,
  cases: Number,
  rate: Number,
  new: Number,
  band: Number,
  data_date: String,
  file_processed_date: String
});

let CovidModel = mongoose.model("covid", CovidSchema);

module.exports = CovidModel;
