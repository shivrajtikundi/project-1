const paymentService = require("../services/payment.service");
const express = require("express");
const router = express.Router();

router.post("/razorpay", razorpay);
router.post("/makePayment", makePayment);

function razorpay(req, res, next){
    paymentService.razorpay(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function makePayment(req, res, next){
    paymentService.makePayment(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;