const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const Licence = db.Licence;
const UserLicence =  db.UserLicence;
const crypto = require("crypto");
const { execPath } = require("process");
const { Promise } = require("mongoose");
const mongoose = require('mongoose');

const licenceService = {
    createLicence,
    getAllLicence
}


function createLicence(req, res){
    return new Promise( async (resolve, reject)=>{
        
        try{
            var {plan_name, user_count, source_count, annual_billing, monthly_billing, automated_translation,
                currency, features} = req.body;
            
            if(plan_name!="" && user_count!="" && source_count!="" && annual_billing!="" && monthly_billing!="" && automated_translation
            && currency!="" && features!=null && features.length>0){
                var payload = {};
                payload.plan_name = plan_name;
                payload.user_count = user_count;
                payload.source_count = source_count;
                payload.annual_billing = annual_billing;
                payload.monthly_billing = monthly_billing;
                payload.automated_translation = automated_translation;
                payload.currency = currency;
                payload.features = features;
                var licenceObj = new Licence(payload);
                await licenceObj.save();
               
                

                resolve({"success":true});
                return;
            }else{
                return reject({"success":false, "error":"Mandatory field(s) missing"});
            }
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getAllLicence(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var userid = req.userdetail._id;
            Licence.aggregate([
                { $match :  {is_active: true} },
                { $lookup:
                    {
                        from: 'features',
                        localField: 'features.feature_id',
                        foreignField: '_id',
                        as: 'features_details'
                    }
                },
                {
                    $project: {
                        _id:1,
                        user_count:1,
                        plan_name:1,
                        source_count:1,
                        currency:1,
                        is_active:1,
                        monthly_billing_per_user:1,
                        annual_billing_per_user:1,
                        automated_translation:1,
                        created_on:1,
                        modified_on:1,
                        user_count_dynamic:1,
                        annual_billing_discount:1,
                        quotation_available:1,
                        features_details: {
                            $map: {
                                input: "$features_details",
                                as: "one",
                                in: {
                                    $mergeObjects: [
                                        "$$one",
                                        {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$features",
                                                        as: "two",
                                                        cond: { $eq: ["$$two.feature_id", "$$one._id"]}
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }

            ]).then(async res => {
                var query = {};
                
                query["userid"] = mongoose.Types.ObjectId(userid); 
                query["is_active"] = true;

                UserLicence.aggregate([
                    { $match :  query }
                ]).then(async childRes=>{
                    await res.forEach(async (elem, index)=>{
                        res[index].licence_type = childRes[0].licence_type;
                        if(String(elem._id)==String(childRes[0].licenceid)){
                            res[index]['associated_to_current_user'] = true;
                        }else{
                            res[index]['associated_to_current_user'] = false;
                        }
                    })
                    resolve({ success: true, data: res})
                }).catch(err=>{
                    return reject({ success: false, message: 'Error occured' })
                });

               
            }).catch(err => {
                return reject({ success: false, message: 'Error occured' })
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

module.exports = licenceService;