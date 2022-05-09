const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const AppSearchSchema = mongoose.Schema(
  {  
    search_term:{
        type: String, 
        required: true
    },
    searched_store:{
        type:String, 
        enum:['GOOGLE_PLAY_STORE', 'ITUNES_APP_STORE'],
        default:'GOOGLE_PLAY_STORE'
    },
    team_id:{
        type:Schema.Types.ObjectId, 
        ref:'team_master'
    },
    searched_by:{
        type:Schema.Types.ObjectId, 
        ref:'user_masters'
    },
    created_on: {
        type: Date, 
        default: Date.now
    }
});

module.exports= mongoose.model("app_searches", AppSearchSchema);