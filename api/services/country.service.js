const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const Country = db.Country;
const crypto = require("crypto");
const { execPath } = require("process");
const { Promise } = require("mongoose");

const countryService = {
    createCountry,
    getAllCountry
}

function getAllCountry(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            Country.find().then(res=>{
                resolve({"success":true, 'data': res});
                return;
            }).catch(err=>{
                return reject({"success":false, "error":"Error Occured"});
            }) 
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function createCountry(req, res){
    return new Promise( async (resolve, reject)=>{
        try{
            var {country_name, country_code, country_flag} = req.body;
            
            if(country_name!="" && country_code!=""){
                var payload = {};
                payload.country_name = country_name;
                payload.country_code = country_code;
                payload.country_flag = country_flag?country_flag:"";
                var countryObj = new Country(payload);
                await countryObj.save();
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

module.exports = countryService;