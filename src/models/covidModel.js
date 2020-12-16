const connection = require("../../db_connection");
const CovidSchema = require("../schemas/covidSchema");
const mongoose = require("mongoose");

const CovidModel = mongoose.model("covid", CovidSchema);
module.exports = CovidModel;
