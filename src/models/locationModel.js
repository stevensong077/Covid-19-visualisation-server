const connection = require("../../db_connection");
const LocationSchema = require("../schemas/locationSchema");
const mongoose = require("mongoose");

const LocationModel = mongoose.model("location", LocationSchema);
module.exports = LocationModel;