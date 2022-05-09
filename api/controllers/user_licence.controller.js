const userLicenceService = require("../services/user_licence.service");
const express = require("express");
const router = express.Router();


router.post("/associateLicenceWithUser", associateLicenceWithUser);
router.post("/associateLicenceWithPayment", associateLicenceWithPayment);
router.post("/getCurrentUserLicenceDetails", getCurrentUserLicenceDetails);

function associateLicenceWithUser(req, res, next){
    userLicenceService.associateLicenceWithUser(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}
function associateLicenceWithPayment(req, res, next){
    userLicenceService.associateLicenceWithPayment(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}
function getCurrentUserLicenceDetails(req, res, next){
    userLicenceService.getCurrentUserLicenceDetails(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;