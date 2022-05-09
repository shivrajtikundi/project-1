const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const Quotation =  db.Quotation;
const { execPath } = require("process");
const { Promise } = require("mongoose");
const mongoose = require('mongoose');

const quotationService = {
    createQuotation
}
function convertToObjId(str){
    return mongoose.Types.ObjectId(str);
}
function createQuotation(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var {licenceid} = req.body;
            var userid = req.userdetail._id;
            if(userid!="" && licenceid!=""){
                var payload = {};
                payload.requested_by = convertToObjId(userid);
                payload.licence_id = convertToObjId(licenceid);
                var quotationObj = new Quotation(payload);
                await quotationObj.save();
                return resolve({"success":true});
            }else{
                return reject({"success":false,"error":"Mandatory fields missing"});
            }
        }catch(err){
            return reject({"success":false,"error":"Error Occured"});
        }
    })
}


module.exports = quotationService;