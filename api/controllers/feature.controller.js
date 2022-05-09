const featureService = require("../services/features.service");
const express = require("express");
const router = express.Router();


router.post("/createFeature", createFeature);

function createFeature(req, res, next){
    featureService.createFeatures(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;