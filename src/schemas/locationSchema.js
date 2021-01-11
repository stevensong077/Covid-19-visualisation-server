const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  postcode: { type: Number, required: true },
  place_name: String,
  state_name: String,
  state_code: String,
  latitude: Number,
  longitude: Number,
  accuracy: Number,
});

module.exports = LocationSchema;
