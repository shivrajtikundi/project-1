const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const CountrySchema = mongoose.Schema(
  {  
    country_name:{type: String, required: true},
    country_code:{type: String, required: true},
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    country_flag: {type: String}
});

module.exports= mongoose.model("country_master", CountrySchema);