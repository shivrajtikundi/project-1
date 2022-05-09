const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const UserLicence = db.UserLicence;
const crypto = require("crypto");
const { execPath } = require("process");
const mongoose = require('mongoose');
const { Promise } = require("mongoose");

const userLicenceService = {
    associateLicenceWithUser,
    associateLicenceWithPayment,
    associateTrialLicence,
    getCurrentUserLicenceDetails
}

function convertToObjId(str){
    return mongoose.Types.ObjectId(str);
}

function getCurrentUserLicenceDetails(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var userid = req.userdetail._id;
            var team_id = req.userdetail.licence_details.team_id;
            if(userid!=""){
                var query = {};
                query["userid"] = convertToObjId(userid);
                query["team_id"] = convertToObjId(team_id);
                query["is_active"] = true;
                await UserLicence.aggregate([
                    {$match:query}
                ]).then(res=>{
                    resolve({"success":true, "data": res[0]});
                    return;
                }).catch(err=>{
                    reject({"success":false,"error":"Error Occured"});
                    return;
                })
            }else{
                return reject({"success":false,"error":"Mandatory fields missing"}); 
            }
        }catch(err){
            return reject({"success":false,"error":"Error Occured"});
        }
    })
}

function associateLicenceWithPayment(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var {licenceid, payment_id} = req.body;
            var userid = req.userdetail._id;
            if(userid!="" && licenceid!="" && payment_id){
                var query = {};
                query["userid"] = convertToObjId(userid);
                query["licenceid"] = convertToObjId(licenceid);
                query["is_active"] = true;

                var payload = {};
                payload.payment_id = convertToObjId(payment_id);
                payload.is_paid = true;

                await UserLicence.updateOne(query, payload).then(res=>{
                    resolve({"success":true});
                    return;
                }).catch(err=>{
                    reject({"success":false,"error":"Error Occured"});
                    return;
                })
            }
        }catch(err){

        }
    })
}

function associateTrialLicence(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            
            var {licenceid, userid, team_id} = req;
            if(userid!="" && licenceid!="" && team_id!=""){
                ///GET THE EXISTING LICENCE///
                var query = {};
                query["userid"] = convertToObjId(userid);
                query["is_active"] = true;
                query["team_id"] = convertToObjId(team_id);
                UserLicence.aggregate([
                    { $match :  query }
                ]).then(async res=>{
                    if(res.length>0){
                        await UserLicence.updateOne({'_id':convertToObjId(res[0]._id)},{$set:{'is_active':false,'updated_on':new Date()}});
                    }
                    ///CREATE A NEW LICENCE////
                    var start_on = new Date();
                    var end_on = new Date();
                    var daysToAdd = 0;
                    daysToAdd = 30;
                    end_on.setDate(end_on.getDate() + daysToAdd);
                    
                    var payload = {};
                    payload.userid = userid;
                    payload.team_id = team_id;
                    payload.licenceid = licenceid;
                    payload.licence_type = "TRIAL";
                    payload.is_active = true;
                    payload.is_paid = false;
                    payload.start_on = start_on;
                    payload.end_on = end_on;
                    payload.seat_count = 7;
                    payload.billing_type =  "MONTHLY";
                    payload.source_count = 20;
                    payload.renewal_date = "";
                    var userLicenceObj = new UserLicence(payload);
                    await userLicenceObj.save();
                    resolve({"success":true});
                    return;
                }).catch(err=>{
                    console.log(err)
                    return reject({"success":false, "error":"Error occured"});
                });
            }else{
                return reject({"success":false, "error":"Mandatory field(s) missing"});
            }
        }catch(err){
            console.log(err)
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}


function associateLicenceWithUser(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            
            var {licenceid, licence_type, is_paid, seat_count, payment_id, billing_type} = req.body;
            var userid = req.userdetail._id;
            var team_id = req.userdetail.team_id;
            if(userid!="" && licenceid!="" && seat_count > 0 && team_id!=""){
                ///GET THE EXISTING LICENCE///
                var query = {};
                query["userid"] = convertToObjId(userid);
                query["is_active"] = true;
                query["team_id"] = convertToObjId(team_id);
                UserLicence.aggregate([
                    { $match :  query }
                ]).then(async res=>{
                    if(res.length>0){
                        await UserLicence.updateOne({'_id':convertToObjId(res[0]._id)},{$set:{'is_active':false,'updated_on':new Date()}});
                    }
                    ///CREATE A NEW LICENCE////
                    var start_on = new Date();
                    var end_on = new Date();
                    var daysToAdd = 0;
                    if(billing_type=="ANNUALY"){
                        daysToAdd = 365;
                    }else{
                        daysToAdd = 30;
                    }
                    end_on.setDate(end_on.getDate() + daysToAdd);
                    is_paid = (is_paid)?is_paid:false;
                    var payload = {};
                    payload.userid = userid;
                    payload.team_id = team_id;
                    payload.licenceid = licenceid;
                    payload.licence_type = (licence_type && licence_type!="" && is_paid==true)?licence_type:"TRIAL";
                    payload.is_active = true;
                    payload.is_paid = is_paid;
                    payload.start_on = start_on;
                    payload.end_on = end_on;
                    payload.seat_count = seat_count;
                    payload.payment_id = payment_id && payment_id!="" ? convertToObjId(payment_id) : "";
                    payload.renewal_date = end_on;
                    payload.source_count = 20;
                    var userLicenceObj = new UserLicence(payload);
                    await userLicenceObj.save();
                    resolve({"success":true});
                    return;
                }).catch(err=>{
                    return reject({"success":false, "error":"Error occured"});
                });
            }else{
                return reject({"success":false, "error":"Mandatory field(s) missing"});
            }
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

module.exports = userLicenceService;