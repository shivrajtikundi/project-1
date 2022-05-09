const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const TeamSchema = mongoose.Schema(
{  
    team_name:{type: String, required: false, default: null},
    // licenceid:{type:Schema.Types.ObjectId,ref:'licences'},
    team_contact_email:{type: String, required: true},
    team_contact_name:{type: String, required: true},
    // licence_type:{
    //     type:String, 
    //     enum:['TRIAL', 'ACTIVE', 'INACTIVE'],
    //     default:'TRIAL'
    // },
    // billing_type:{
    //     type:String, 
    //     enum:['ANNUALY', 'MONTHLY'],
    //     default:'ANNUALY'
    // },
    // members_count: {type: Number, default: 1},
    // start_on: {type: Date, default: Date.now},
    // end_on: {type: Date, default: Date.now},
    // is_paid: {type:Boolean, default: false},
    // payment_id: {type:Schema.Types.ObjectId,ref:'payments'},
    is_active: {type:Boolean, default: true},
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now},
    // seat_count: {type: Number, default: 0},
    // renewal_date: {type: Date, default: Date.now}
});

module.exports= mongoose.model("team_master", TeamSchema);