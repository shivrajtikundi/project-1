const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const UserLicenceSchema = mongoose.Schema({
    userid:{type:Schema.Types.ObjectId,ref:'user_masters'},
    team_id:{type:Schema.Types.ObjectId,ref:'team_master'},
    licenceid:{type:Schema.Types.ObjectId,ref:'licences'},
    licence_type:{
        type:String, 
        enum:['TRIAL', 'ACTIVE', 'INACTIVE'],
        default:'TRIAL'
    },
    billing_type:{
        type:String, 
        enum:['ANNUALY', 'MONTHLY'],
        default:'ANNUALY'
    },
    start_on: {type: Date, default: Date.now},
    end_on: {type: Date, default: Date.now},
    is_paid: {type:Boolean, default: false},
    payment_id: {type:Schema.Types.ObjectId,ref:'payments'},
    is_active: {type:Boolean, default: true},
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    seat_count: {type: Number, default: 0},
    source_count:{type: String, default: 0},
    renewal_date: {type: Date, default: Date.now}
});

module.exports= mongoose.model("user_licences", UserLicenceSchema);