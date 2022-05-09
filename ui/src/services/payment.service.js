import { razor_pay_key_id, apiUrl } from "../constants/config";
import { alertService } from "./index";
import { helperService } from "./helper.service";

export const paymentService = {      
    displayRazorpay
};

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function createOrder(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}payment/razorpay`, requestOptions).then(helperService.handleResponse);
}

function assignLicence(data){
    console.log(data);
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}user_licence/associateLicenceWithUser`, requestOptions).then(helperService.handleResponse);
}

function makePayment(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}payment/makePayment`, requestOptions).then(helperService.handleResponse);
}




async function displayRazorpay(req, res) {
    const script_response = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!script_response) {
        alertService.throwError("Razorpay SDK failed to load. Are you online?");
        return;
    }
    await createOrder(req).then(data=>{

        var {licenceid, licence_type, billing_type, seat_count, amount, currency} =  req;

        const options = {
            key: razor_pay_key_id,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: data.payment_name,
            description: data.payment_desc,
            image: '',
            handler: function (response) {
                var makepayobj = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    pay_currency: data.currency,
                    total_amnt:  data.amount.toString(),
                    licenceid: licenceid,
                    licence_type: licence_type,
                    billing_type: billing_type,
                    seat_count: seat_count,
                    amount: amount,
                    currency: currency,
                }
                makePayment(makepayobj).then(async res=>{
                    console.log(res)
                    if(res.success == true){
                        var licnenceObj = {
                            licence_type: makepayobj.licence_type,
                            licenceid : makepayobj.licenceid,
                            billing_type:makepayobj.billing_type,
                            is_paid: true,
                            is_active: true,
                            seat_count: makepayobj.seat_count,
                            amount: makepayobj.amount,
                            currency: makepayobj.currency,
                            payment_id : res.data
                        };
                        await assignLicence(licnenceObj).then(responsAssnLicence =>{
                            alertService.throwSuccess("Success");
                        }).catch(err=>{
                            console.log(err)
                            alertService.throwError("Error occured1");
                        });
                    }
                }).catch(err=>{
                    console.log(err)
                    alertService.throwError("Error occured2");
                });
            },
            prefill: {
                name: data.payee_name,
                email: data.payee_email,
                phone_number: ''
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }).catch((err)=>{
        console.log(err)
        alertService.throwError("Failed to create order");
        return;
    });
}