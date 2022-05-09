const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const User = db.Users;
const {Teams} = db;
const crypto = require("crypto");
const { execPath } = require("process");
const { Promise } = require("mongoose");
const {associateTrialLicence} = require("./user_licence.service");
const mongoose = require('mongoose');
const { UserLicence } = require("../helpers/db");
const SendMail = require("../helpers/mail.helper");

function generatePass(len) {
    var ans = '';
    var arr = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
    for (var i = len; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}


function convertToObjId(str){
    return mongoose.Types.ObjectId(str);
}

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}
const userService = {
    signup,
    login,
    updateProfile,
    validEmail,
    findTokenUser,
    addUser
}

function login(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var user_email = req.body.user_email;
            var user_password = req.body.user_password && req.body.user_password!="" ? sha1(req.body.user_password):"";

            if(user_password=="" || user_email=="" ){
                reject({"success":false,"error":"Mandatory Fields Missing"});
                return;
            }
            
            var query = {};
            query["user_email"] = user_email;
            query["user_password"] = user_password;
            var result = [];

            await User.find(query).then(res=>{
                if(res.length>0){
                    var query = {};
                    query["userid"] = convertToObjId(res[0]["_id"]);
                    query["is_active"] = true;
                    UserLicence.aggregate([
                        { $match :  query }
                    ]).then(response=>{
                        result = res; 
                        var privateKey = config.secret;
                        var payload = {
                            _id:result[0]["_id"],
                            user_email:result[0]["user_email"],
                            user_password:result[0]["user_password"],
                            team_id:result[0]["team_id"],
                            licence_details:response[0]
                        }
                        var token = jwt.sign(payload, privateKey, { expiresIn: '24h' });
                        resolve({"success":true,"data":result,"token": token});
                        return;
                    }).catch(err=>{
                        reject({"success":false,"error":"Error Occured"});
                        return;
                    })
                }else{
                    reject({"success":false,"error":"Invalid Credentials"});
                    return;
                }

            }).catch(err=>{
                reject({"success":false,"error":"Error Occured"});
                return;
            });

        }catch(err){
            reject({"success":false,"error":"Error Occured"});
            return;
        }
    })
}


function signup(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var user_email = req.body.user_email;
            var user_password = req.body.user_password && req.body.user_password!="" ? sha1(req.body.user_password):"";
            var user_name = req.body.user_name;
            if(user_name=="" || user_password=="" || user_email=="" ){
                reject({"success":false,"error":"Mandatory Fields Missing"});
                return;
            }
            var teamQuery = {};
            teamQuery["team_contact_email"] = user_email;
            Teams.aggregate([{$match:teamQuery}]).then(async objTeam=>{
                if(objTeam.length > 0 ){
                    reject({"success":false,"error": "Email is associated with another user"});
                    return;
                }else{
                    var query = {};
                    query["user_email"] = user_email;
                    await User.find(query).then(async res=>{
                        if(res.length>0){
                            reject({"success":false,"error": "Email is associated with another user"});
                            return;
                        }else{
                            var teamsPayload = {};
                            
                            ///CREATE A NEW TEAM////
                            teamsPayload.team_contact_name = user_name;
                            teamsPayload.team_contact_email = user_email;
                            var teamObj = new Teams(teamsPayload);
                            await teamObj.save();
                            var query = {};
                            query["team_contact_name"] = user_name;
                            query["team_contact_email"] = user_email;
                            Teams.aggregate([{$match:query}]).then(async objTeam=>{
                                var payload = {};
                                payload.user_name = user_name;
                                payload.user_password = user_password;
                                payload.user_email = user_email;
                                payload.role = "ADMIN";
                                payload.team_id = convertToObjId(objTeam[0]._id);
                                var userObj = new User(payload);
                                await userObj.save();
                                var query = {};
                                query["user_name"] = user_name;
                                query["user_password"] = user_password;
                                query["user_email"] = user_email;
                                User.aggregate([{$match:query}]).then(async objuser=>{
                                    var req = {};
                                    req.team_id = convertToObjId(objTeam[0]._id);
                                    req.licenceid = convertToObjId('6259272835cdc32b60e5f746');
                                    req.userid = convertToObjId(objuser[0]._id);
                                    associateTrialLicence(req).then(res=>{
                                        if(res.success == true){
                                            resolve({"success":true});
                                            return;
                                        }else{
                                            reject({"success":false,"error":"Error Occured"});
                                            return;
                                        }
                                    }).catch(err=>{
                                        reject({"success":false,"error":"Error Occured"});
                                        return;
                                    })
                                }).catch(err=>{
                                    reject({"success":false,"error":"Error Occured"});
                                    return;
                                })
                            }).catch(err=>{
                                reject({"success":false,"error":"Error Occured"});
                                return;
                            })
                        }
                    }).catch(err=>{
                        reject({"success":false,"error":"Error Occured"});
                        return;
                    });
                }
            }).catch(err=>{
                reject({"success":false,"error":"Error Occured"});
                return;
            })

            
        }catch(err){
            reject({"success":false,"error":"Error Occured"});
            return;
        }
    })
}

function validEmail(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var user_email = req.body.user_email;
            if(user_email==""){
                reject({"success":false,"error":"Mandatory Fields Missing"});
                return;
            }
            var query = {};
            query["user_email"] = user_email;
            await User.find(query).then(res=>{
                if(res.length>0){
                    reject({"success":false,"error": "Email is associated with another user"});
                    return;
                }else{
                    resolve({"success":true});
                    return;
                }
            }).catch(err=>{
                reject({"success":false,"error":"Error Occured"});
                return;
            });
        }catch(err){
            reject({"success":false,"error":"Error Occured"});
            return;
        }
    })
}

function updateProfile(req, res){
    return new Promise(async(resolve, rejected)=>{
        try{
            var id = req.userdetail._id;
            var user_email = req.body.user_email;
            var user_password = req.body.user_password && req.body.user_password!="" ? sha1(req.body.user_password):"";
            var user_name = req.body.user_name;
            if(id=="" || user_name=="" || user_password=="" || user_email=="" ){
                reject({"success":false,"error":"Mandatory Fields Missing"});
                return;
            }
            var query = {};
            query["_id"] = id;

            var payload = {};
            payload.user_name = user_name;
            payload.user_password = user_password;
            payload.user_email = user_email;

            await User.updateOne(query, payload).then(res=>{
                resolve({"success":true});
                return;
            }).catch(err=>{
                reject({"success":false,"error":"Error Occured"});
                return;
            })
        }catch(err){
            reject({"success":false,"error":"Error Occured"});
            return;
        }
    })
}

function findTokenUser(req){
    return new Promise(async (resolve, reject) => {
        if(req.userdetail && req.userdetail._id != ""){
            var userid = req.userdetail._id;
            var query = {};
            query["_id"] = userid; 
            await User.find(query).then(res=>{
                if(res.length>0){
                    resolve({"success":true,"data":res});
                    return;
                }else{
                    reject({"success":false,"error":"Invalid Token"});
                    return;
                }
            }).catch(err=>{
                reject({"success":false,"error":"Invalid Token"});
                return;
            });
        }else{
            return reject({"success":false,"error":"Token Authentication Failed"});
        }
    })
}

function addUser(req, res){
    return new Promise(async (resolve, reject) => {
        if(req.userdetail && req.userdetail._id != ""){
            var created_by = req.userdetail._id;
            var licence_details = req.licence_details;
            var team_id = req.userdetail.team_id;
            var user_email = req.body.user_email;
            var user_name = req.body.user_name;
            var query = {};
            query["user_email"] = user_email; 
            await User.find(query).then(async res=>{
                if(res.length>0){
                    reject({"success":false,"error":"Email is associated with another user"});
                    return;
                }else{
                    var payload = {};
                    var user_password = generatePass(8);
                    payload.user_name = user_name;
                    payload.user_password = sha1(user_password);
                    payload.user_email = user_email;
                    payload.role = "MEMBER";
                    payload.team_id = convertToObjId(team_id);
                    payload.created_by = convertToObjId(created_by);
                    var userObj = new User(payload);
                    await userObj.save().then(async res=>{
                        await SendMail(user_email, user_name, user_password); 
                        resolve({"success":true});
                        return;
                    }).catch(err=>{
                        reject({"success":false,"error":"Invalid Token"});
                        return;
                    });
                }
            }).catch(err=>{
                reject({"success":false,"error":"Invalid Token"});
                return;
            });
        }else{
            return reject({"success":false,"error":"Mandatory fields missing"});
        }
    })
}


module.exports = userService;