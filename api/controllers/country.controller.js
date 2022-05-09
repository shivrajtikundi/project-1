const countryService = require("../services/country.service");
const express = require("express");
const router = express.Router();


router.post("/createCountry", createCountry);
router.get("/getAllCountry", getAllCountry);


function createCountry(req, res, next){
    countryService.createCountry(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getAllCountry(req, res, next){
    countryService.getAllCountry(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;