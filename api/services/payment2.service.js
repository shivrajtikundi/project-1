const db = require("../helpers/db");
const shortid = require('shortid');
const Razorpay = require('razorpay');

const paymentService = {
    razorpay
}


async function razorpay(req, res){
	console.log(req.body)
	var user_email = req.userdetail.user_email;
	var user_name = req.userdetail.user_name;
	var pay_amnt = req.body.amount;
	var pay_currency = req.body.currency;
	var payment_name = req.body.payment_name;
	var payment_name = req.body.payment_desc;
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Q5SuMsyH1vVE8n',
        key_secret: '5ZoWPVFaw39Sjaxq4s8wX5To'
    })

    const payment_capture = 1
	const amount = pay_amnt
	const currency = currency

	const options = {
		amount: 449 * 100,
		currency: pay_currency,
		receipt: shortid.generate(),
		payment_capture
	}
	console.log(12)
	try {
		console.log(1)
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			payment_name : payment_name,
			payment_desc : payment_name,
			payee_name: user_name,
			payee_email: user_email
		})
	} catch (error) {
		console.log(2)
		res.json({
			success:false,
			error:"Error Occurred"
		})
	}
}


module.exports = paymentService;