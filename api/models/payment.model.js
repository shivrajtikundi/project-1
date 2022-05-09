const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const PaymentSchema = Schema({
    razorpay_order_id: {type: String, default :""},
    razorpay_payment_id: {type: String, default :""},
    razorpay_signature: {type: String, default: ""},
    amount_paid: {type: String, defauolt: ""},
    payment_currency: {type: String, default: ""},
    created_on:{type:Date, default:Date.Now},
    paymented_by:{type:Schema.Types.ObjectId,ref:'user_masters'},
    paid_team_id: {type:Schema.Types.ObjectId,ref:'team_master'}
});

module.exports= mongoose.model("payments", PaymentSchema);