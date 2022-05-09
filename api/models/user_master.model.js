const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const UserMasterSchema = mongoose.Schema(
  {  
    user_email:{type: String, required: true},
    user_password:{type: String, required: true},
    user_name : {type: String, required: true},
    is_active : {type: Boolean, default: true},
    user_password_reset_required : {type: Boolean, default: false},
    team_id: {type:Schema.Types.ObjectId,ref:'team_master'},
    role:{type: String, enum:['ADMIN','LEADER','MEMBER'], default: 'MEMBER'},
    created_by: {type:Schema.Types.ObjectId,ref:'user_masters', required: false, default: null},
    created_on: {type: Date, default: Date.now},
    modified_by: {type:Schema.Types.ObjectId,ref:'user_masters', required: false, default: null},
    modified_on: {type: Date, default: Date.now}
});

module.exports= mongoose.model("user_masters", UserMasterSchema);
