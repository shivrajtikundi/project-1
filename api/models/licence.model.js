const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const licenceSchema = mongoose.Schema({
    plan_name:{type: String, required: true},
    user_count:{type: String, required: true, default:1},
    source_count:{type: String, required: true, default:1},
    annual_billing:{type: Number, required: true},
    monthly_billing:{type:Number, required: true},
    automated_translation:{type:String, required: true},
    currency:{
        type:String, 
        enum:['USD', 'INR'],
        default:'INR'
    },
    features: [
        {
            feature_id:{type:Schema.Types.ObjectId,ref:'features'},
            feature_toggle:{type: Boolean, default: false}
        }
    ],
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: true},
    user_count_dynamic: {type: Boolean, default: false},
    quotation_available: {type: Boolean, default: false}
});

module.exports= mongoose.model("licences", licenceSchema);