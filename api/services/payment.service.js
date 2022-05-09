const db = require("../helpers/db");
const shortid = require('shortid');
const Razorpay = require('razorpay');
const Payment =  db.Payment;
const mongoose = require('mongoose');

const paymentService = {
    razorpay,
	makePayment
}
function convertToObjId(str){
    return mongoose.Types.ObjectId(str);
}
function makePayment(req, res){
	return new Promise( async (resolve, reject)=>{
		try{
			var payload = {};
			payload.razorpay_order_id  = req.body.razorpay_order_id;
			payload.razorpay_payment_id  = req.body.razorpay_payment_id;
			payload.razorpay_signature  = req.body.razorpay_signature;
			payload.paymented_by = req.userdetail._id;
			payload.payment_currency = req.body.pay_currency;
			payload.amount_paid = String(req.body.amount);
			var paymentObj = new Payment(payload);
			await paymentObj.save();
			var query = {};
			query["paymented_by"] = convertToObjId(req.userdetail._id);
			query['razorpay_order_id'] = req.body.razorpay_order_id;
			query['razorpay_payment_id'] = req.body.razorpay_payment_id;
			query['razorpay_signature'] = req.body.razorpay_signature;

			await Payment.aggregate([{$match:query}]).sort({_id:-1}).limit(1).then(res=>{
				return resolve({"success": true, "data": res[0]._id});
			})
		}catch(err){
			console.log(err)
			return reject({"success": false});
		};
	});
}

async function razorpay(req, res){
	var user_email = req.userdetail.user_email;
	var user_name = req.userdetail.user_name;
	var pay_currency = req.body.currency;
	var payment_name = req.body.payment_name;
	var payment_desc = req.body.payment_desc;
	var total_amnt = req.body.amount;
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Q5SuMsyH1vVE8n',
        key_secret: '5ZoWPVFaw39Sjaxq4s8wX5To'
    })

    const payment_capture = 1
	const amount = parseInt(total_amnt)
	const currency = pay_currency

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			payment_name : payment_name,
			payment_desc : payment_desc,
			payee_name: user_name,
			payee_email: user_email
		})
	} catch (error) {
		console.log(error)
		res.json({
			success:false,
			error:"Error Occurred"
		})
	}
}


module.exports = paymentService;