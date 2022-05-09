const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const quotationSchema = mongoose.Schema({
    licence_id:{type:Schema.Types.ObjectId,ref:'licences'},
    requested_by:{type:Schema.Types.ObjectId,ref:'user_masters'},
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: true},

});

module.exports= mongoose.model("quotation_requests", quotationSchema);