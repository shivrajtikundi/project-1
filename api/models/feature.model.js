const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const FeatureSchema = mongoose.Schema(
  {  
    feature_name:{type: String, required: true},
    feature_desc:{type: String, required: true},
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: true}
});

module.exports= mongoose.model("features", FeatureSchema);
