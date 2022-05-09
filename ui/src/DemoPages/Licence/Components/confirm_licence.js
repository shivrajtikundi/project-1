import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table  } from 'reactstrap';
import style from "../style.module.css";
import CreditCard from 'react-credit-cards';
import Select from 'react-select';
import { countryService, alertService, paymentService } from '../../../services';
import SupportedCards from './Cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './util';

import 'react-credit-cards/es/styles-compiled.css';

const ConfirmLicence = () => {
    const [{
        cvc,
        expirydate,
        cardnumber,
        cardholdername,
        focused,
        postalcode,
        country_list
    }, setState] = useState({
        cvc :"",
        expirydate:"",
        cardnumber:"",
        cardholdername:"",
        focused:"",
        postalcode:"",
        country_list:[]
    })

    useEffect(()=>{
        getAllCountryOptions();
    },[]);

    const country_options = [
        { value: '91', label: 'India' },
        { value: '01', label: 'Bangladesh' }
    ]

    const getAllCountryOptions = () =>{
        countryService.getAllCountry().then(res=>{
            if (res.success ==  true){
                var countryList = [];
                res.data.forEach((elem, index)=>{
                    var childJson = {
                        value: elem._id,
                        label: elem.country_name
                    };
                    countryList.push(childJson);
                });
                setState((prevState)=>({
                    ...prevState,
                    country_list:countryList
                }));
            }else{
                alertService.throwError("Unable to find countries please contact support");
                return;
            }
        }).catch(err=>{
            alertService.throwError("Unable to find countries please contact support");
            return;
        });
    }
    
    const securePay = () =>{
        console.log("sdadfafeafafasfafa");
        paymentService.displayRazorpay();
    }

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState((prevState) => ({
                ...prevState,
                issuer: issuer
            }));
        }
    };
    
    const handleInputFocus = ({ target }) => {
        setState((prevState) => ({
            ...prevState,
            issuer: target.name
        }));
    };
    
    const handleInputChange = ({ target }) => {
        if (target.name === 'cardnumber') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expirydate') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }
        var elemName = target.name;
        var elemvalue = target.value;
        setState((prevState) => ({
            ...prevState,
            [elemName]: elemvalue
        }));
    };


    return(
        <Fragment>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <p className={style.licenceHeader}>
                        appbot
                    </p>
                    <p className={style.selectPlanHeader}>
                        Confirmation
                    </p>
                </Col>
                <Col md="4"></Col>
            </Row>
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                    <Card className={style.customePlanConfirmationCard}>
                        <CardBody>
                            <CardTitle>
                                Credit Card
                                <CreditCard
                                    number={cardnumber}
                                    name={cardholdername}
                                    expiry={expirydate}
                                    cvc={cvc}
                                    focused={focused}
                                    callback={(e)=>handleCallback(e)}
                                />
                            </CardTitle>
                            <Row className={style.InputRow}>
                                <Col md="12">
                                    <Label for="nameOnCard">Name On Card</Label>
                                    <Input
                                        id = "nameOnCard"
                                        inputMode="text"
                                        name="cardholdername"
                                        placeholder="Name On Card"
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                        onFocus={(e)=>handleInputFocus(e)}
                                        value={cardholdername}
                                    />
                                </Col>
                            </Row>
                            <Row className={style.InputRow}>
                                <Col md="6">
                                    <Label for="cardnumber">Card Number</Label>
                                    <Input
                                        id = "cardnumber"
                                        inputMode="tel"
                                        type="tel"
                                        name="cardnumber"
                                        placeholder="Card Number"
                                        pattern="[\d| ]{16,22}"
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                        onFocus={(e)=>handleInputFocus(e)}
                                        value={cardnumber}
                                    />
                                </Col>
                                <Col md="3" style={{float:"left"}}>
                                    <Label for="expirydate">Valid Thru</Label>
                                    <Input
                                        id = "expirydate"
                                        inputMode="tel"
                                        type="tel"
                                        name="expirydate"
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                        onFocus={(e)=>handleInputFocus(e)}
                                        value = {expirydate}
                                    />
                                </Col>
                                <Col md="3" style={{float:"left"}}>
                                    <Label for="cvc">CVC</Label>
                                    <Input
                                        type="tel"
                                        id = "cvc"
                                        inputMode="tel"
                                        name="cvc"
                                        placeholder="CVC"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                        onFocus={(e)=>handleInputFocus(e)}
                                        value = {cvc}
                                    />
                                </Col>
                            </Row>
                            <Row  className={style.InputRow}>
                                <Col md="6">
                                    <Label for="country">Select Country</Label>
                                    <Select 
                                        id="country"
                                        options={country_list} 
                                        menuPlacement="top"
                                    />
                                </Col>
                                <Col md="6">
                                    <Label for="postalcode">Postal Code</Label>
                                    <Input
                                        type="tel"
                                        id = "postalcode"
                                        inputMode="tel"
                                        name="postalcode"
                                        placeholder="postalcode"
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                        onFocus={(e)=>handleInputFocus(e)}
                                        value = {postalcode}
                                    />
                                </Col>
                            </Row>
                            <Row className={style.InputRowSecond}>
                                <Col md="1" className={style.customPlanText}>
                                    <div className={style.plantext}>
                                        Plan
                                    </div>
                                </Col>
                                <Col md="10"></Col>
                                <Col md="1" className={style.customtotalText}>
                                    <div className={style.totaltext}>
                                        Total
                                    </div>
                                </Col>
                            </Row>

                            <Row className={style.InputRowThird}>
                                <Col md="6" className={style.customPlanText}>
                                    <div className={style.seatCountText}>
                                        Large 7 Seat
                                    </div>
                                    <div>
                                        Billed Anually ($149 * 12 Months)
                                    </div>
                                </Col>
                                <Col md="6" className={style.customtotalText}>
                                    <div className={style.totalCostText}>
                                        $1788
                                    </div>
                                </Col>
                            </Row>
                            <Row className={style.InputRowFourth}>
                                <Col md="5"></Col>

                                <Col md="7">
                                    <Row className={style.finalCostUnderLine}>
                                        <Col md="6" className={style.totalpaytodaytext}>
                                            Total to pay today
                                        </Col>
                                        <Col md="6" className={style.finalTotalCostText}>
                                            $1788
                                            <span className={style.currencyText}>USD</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className={style.customCardfooter}>
                            <Button onClick={(e)=>securePay()} className={style.confirmPayBtn}>
                                Confirm and sucurely pay 
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="3"></Col>
            </Row>
            <Row style={{padding:"20px"}}>
                <Col md="4"></Col>
                <Col md="4" style={{textAlign:"center"}}>By continuing you agree to our <Link className={style.termLink}>terms</Link></Col>
                <Col md="4"></Col>
            </Row>
        </Fragment>
    )
}

export default ConfirmLicence;