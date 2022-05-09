const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const Features = db.Features;
const crypto = require("crypto");
const { execPath } = require("process");
const { Promise } = require("mongoose");

const featureService = {
    createFeatures
}


function createFeatures(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var {features} = req.body;
            
            if(features!=null && features.length>0){
                features.forEach(async (elem, index)=>{
                    var payload = {};
                    payload.feature_name = elem.feature_name;
                    payload.feature_desc = elem.feature_desc;
                    var featureObj = new Features(payload);
                    await featureObj.save();
                });
                

                resolve({"success":true});
                return;
            }else{
                return reject({"success":false, "error":"Mandatory field(s) missing"});
            }
        }catch(err){
            console.log(err);
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

module.exports = featureService;