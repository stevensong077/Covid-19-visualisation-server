const mongoose = require("mongoose");

const CovidSchema = new mongoose.Schema({
  postcode: { type: Number, required: true },
  population: Number,
  active: Number,
  cases: Number,
  rate: Number,
  new: Number,
  band: Number,
  data_date: String,
  file_processed_date: String,
});

module.exports = CovidSchema;
