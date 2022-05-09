const licenceService = require("../services/licence.service");
const quotationService = require("../services/quotation.service");
const express = require("express");
const router = express.Router();


router.post("/createLicence", createLicence);
router.get("/getAllLicence", getAllLicence);
router.post("/createQuotation", createQuotation);

function createQuotation(req, res, next){
    quotationService.createQuotation(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function createLicence(req, res, next){
    licenceService.createLicence(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getAllLicence(req, res, next){
    licenceService.getAllLicence(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;