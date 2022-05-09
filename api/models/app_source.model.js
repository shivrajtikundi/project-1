const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const AppSourceSchema = mongoose.Schema(
{  
    team_id:{
        type:Schema.Types.ObjectId, 
        ref:'team_master'
    },
    app_title:{
        type: String, 
        required: true
    },
    store_type:{
        type:String, 
        enum:['GOOGLE_PLAY_STORE', 'ITUNES_APP_STORE'],
        default:'GOOGLE_PLAY_STORE'
    },
    app_id:{
        type:String, 
        required: false,
        default:null
    },
    app_bundle_id:{
        type:String, 
        required: true
    },
    app_developer:{
        type: String, 
        required: true
    },
    app_developer_id:{
        type: String, 
        required: true
    },
    is_free:{
        type:Boolean,
        default: false
    },
    app_url:{
        type:String,
        default: null
    },
    app_icon:{
        type:String,
        default: null
    },
    added_by:{
        type:Schema.Types.ObjectId,
        ref:'user_masters'
    },
    is_deleted:{
        type:Boolean,
        default: false
    },
    deleted_by:{
        type:Schema.Types.ObjectId,
        ref:'user_masters',
        required: false,
        default: null
    },
    deleted_on:{
        type:Date,
        required: false,
        default: null
    },
    created_on: {type: Date, default: Date.now},
    modified_on: {type: Date, default: Date.now}
});



module.exports= mongoose.model("app_sources", AppSourceSchema);