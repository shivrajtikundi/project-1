import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table  } from 'reactstrap';
import style from "../style.module.css";
import {licenceService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import cx from 'classnames';
import Select from 'react-select';
import { paymentService } from '../../../services';


const AllLicence = () => {
    const [{
        allLicence,
        activeIndex,
        modalOpen,
        billing_type,
        selected_plan,
        monthly_billing_per_user,
        annual_billing_per_user,
        plan_discount,
        user_count_dynamic,
        plan_name,
        user_count,
        selected_user_cnt_opt,
        quotation_available
    },setState] = useState({
        allLicence : [],
        activeIndex: null,
        modalOpen: false,
        billing_type: "ANNUALY",
        selected_plan: null,
        monthly_billing_per_user:0,
        annual_billing_per_user:0,
        plan_discount:0,
        user_count_dynamic: false,
        plan_name: "",
        user_count:"",
        selected_user_cnt_opt: 0,
        quotation_available: false
    }) 
    useEffect(()=>{
        getAllLicence();
    },[])

    const securePay = () =>{
        var plan =  allLicence.find(item => { return item._id == selected_plan });
        var total_amount = 0; 
        total_amount = (billing_type=="ANNUALY")?user_count*parseInt(plan.annual_billing_per_user):user_count*parseInt(plan.monthly_billing_per_user);
        var paymentDesc = "";
        var amount_to_pay = 0;
        if(billing_type=="ANNUALY"){
            paymentDesc = "Billed Anually ( ₹"+String(total_amount) +" x 12 Months )";
            amount_to_pay = total_amount * 12;
        }else{
            paymentDesc = "Billed Monthly ( ₹"+String(total_amount) +" x 1 Month )";
            amount_to_pay = total_amount * 1;
        }
        var req = {
            licence_type: "ACTIVE",
            licenceid : plan._id,
            billing_type:billing_type,
            is_paid: true,
            is_active: true,
            seat_count: user_count,
            amount: amount_to_pay,
            currency: plan.currency,
            payment_name: plan.plan_name + " " + String(user_count) + " Seat(s)",
            payment_desc: paymentDesc
        }

        paymentService.displayRazorpay(req);
    }

    const changeUserCount = (e) => {
        setState((prevState) => ({
            ...prevState,
            user_count: e.value,
            selected_user_cnt_opt: e
        }))
    }

    const selectBillingType = (type) =>{
        setState((prevState) => ({
            ...prevState,
            billing_type: type
        }))
    }

    const user_count_options = [
        { value: '7', label: '7 Users' },
        { value: '10', label: '10 Users' },
        { value: '12', label: '12 Users' },
        { value: '15', label: '15 Users' },
        { value: '20', label: '20 Users' },
        { value: '30', label: '30 Users' },
        { value: '40', label: '40 Users' },
        { value: '50', label: '50 Users' },
    ]

    const toggleModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalOpen: !modalOpen
        }))
    }

    const getAllLicence = () => {
        licenceService.getAllLicence().then(async (response) => {
            console.log(response,"RESPPN")
            if(response.success==true){
                var activeIndex = 0;
                var selected_plan = "";
                var monthly_billing_per_user = 0;
                var annual_billing_per_user = 0;
                var plan_discount = 0;
                var user_count_dynamic = false;
                var plan_name = "";
                var user_count = "";
                var quotation_available = false;
                response.data.forEach(function(elem, index){
                    if(elem.associated_to_current_user==true){
                        activeIndex = index;
                        selected_plan = elem._id;
                        monthly_billing_per_user = elem.monthly_billing_per_user;
                        annual_billing_per_user = elem.annual_billing_per_user;
                        plan_discount = elem.annual_billing_discount;
                        user_count_dynamic = elem.user_count_dynamic;
                        plan_name = elem.plan_name;
                        user_count = elem.user_count.match(/\d+/)[0];
                        quotation_available = elem.quotation_available;
                    }
                })
                var defaultUserCountOption = user_count_options.find(item=>{ return item.value = String(user_count.match(/\d+/)[0])});
                setState((prevState)=>({
                    ...prevState, 
                    allLicence: response.data, 
                    activeIndex: activeIndex, 
                    selected_plan: selected_plan,
                    monthly_billing_per_user: monthly_billing_per_user,
                    annual_billing_per_user: annual_billing_per_user,
                    plan_discount: plan_discount,
                    user_count_dynamic: user_count_dynamic,
                    plan_name: plan_name,
                    user_count: user_count,
                    selected_user_cnt_opt: defaultUserCountOption,
                    quotation_available: quotation_available
                }))
            }else{
                alertService.throwError(response.error);
                return;
            }
        }).catch(error => {
            console.log(error)
            alertService.throwWarning(error);
            return;
        });
    }

    const highlightPlan = (index, planid) => {
        var highlightedPlan =  allLicence.find(item => { return item._id == planid });
        var defaultUseCountOption = user_count_options.find(item=>{ return item.value = String(highlightedPlan.user_count.match(/\d+/)[0])});
        setState((prevState)=>({
            ...prevState, 
            activeIndex: index, 
            selected_plan: highlightedPlan._id,
            monthly_billing_per_user: highlightedPlan.monthly_billing_per_user,
            annual_billing_per_user: highlightedPlan.annual_billing_per_user,
            plan_discount: highlightedPlan.annual_billing_discount,
            user_count_dynamic: highlightedPlan.user_count_dynamic,
            plan_name: highlightedPlan.plan_name,
            user_count: highlightedPlan.user_count.match(/\d+/)[0],
            selected_user_cnt_opt: defaultUseCountOption,
            quotation_available: highlightedPlan.quotation_available
        }))
    }
    const customStyles = {
        control: () => ({
            border: 0,
            boxShadow: "none"
        })
    }

    const SendQuotation = () => {
        var licence_id = selected_plan;
        var req = {
            licenceid: licence_id
        }
        try{
            licenceService.createQuotation(req).then(res=>{
                if(res.success == true){
                    alertService.throwError("Our team will get back to you");
                }else{
                    alertService.throwSuccess(res.error);
                }
            }).catch(err=>{
                alertService.throwError("Error Occured");
            })
        }catch(err){
            alertService.throwError("Error Occured");
        }
        
    }

    return(
        <Fragment>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <p className={style.licenceHeader}>
                        appbot
                    </p>
                    <p className={style.selectPlanHeader}>
                        Select your plan
                    </p>
                    <p className={style.planHelperHeader}>
                        Not sure what plan is right fro you? <Link>Use our plan helper &#8594; </Link>
                    </p>
                </Col>
                    
                <Col md="4"></Col>

            </Row>
            <Row className={style.planContainer}>
                {
                    allLicence.map((elem,index)=>{
                        return (
                            <Col md="3">
                                <Card onClick={(e)=>highlightPlan(index, elem._id)} className={cx(style.customLicenceCard,(index==activeIndex)?style.activeCard:"")}>
                                    <CardBody>
                                        <CardTitle>
                                            {activeIndex==index?
                                            <div className={style.activatedPlan}>&#10003;</div> :
                                            <div className={style.listedPlan}></div>}
                                           
                                            <div className={style.planHeader}>{elem.plan_name}</div>
                                        </CardTitle>
                                        <div className={style.planUserCount}>
                                            {elem.user_count} User(s)
                                        </div>
                                        <div className={style.planFeatureContainer}>
                                            <div>
                                                <div className={style.toggleFeatureActive}>
                                                    &#10003;
                                                </div>
                                                {/* <div className={style.toggleFeatureDeactive}>
                                                    &#x2717;
                                                </div> */}
                                                <div className={style.featureDesc}>
                                                    All the standard features plus:
                                                </div>
                                            </div>
                                            {
                                                elem.features_details.map((childElem,childIndex)=>{
                                                    if(childIndex<=3){
                                                        return(
                                                            <div>
                                                                {childElem.feature_toggle==true?
                                                                    <div className={style.toggleFeatureActive}>
                                                                        &#10003;
                                                                    </div>:
                                                                    <div className={style.toggleFeatureDeactive}>
                                                                        &#x2717;
                                                                    </div> 
                                                                }
                                                                <div className={style.otherFeatureDesc}>
                                                                    {childElem.feature_name}
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                })
                                            }
                                        </div>
                                        {elem.associated_to_current_user==true && elem.licence_type == "TRIAL"?
                                            <div className={style.trialingTag}>
                                                <p>Trialing</p>
                                            </div> :
                                            <></>}
                                    </CardBody>
                                    <CardFooter className={style.customLicenceCardFooter}>
                                        <Button onClick={(e)=>toggleModal()}>See All Features</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            {quotation_available == false?
                <>
                    {user_count_dynamic == true?
                        <Row className={style.user_selection}>
                            <Col md="4"></Col>
                            <Col md="4" className={style.planSelectionText}>
                                Select Users
                            </Col>
                            <Col md="4"></Col>
                            <Col md="5">
                            </Col>
                            <Col md="2" className={style.userSelecttionContainer}>
                                <Select 
                                    value = {selected_user_cnt_opt}
                                    options={user_count_options} 
                                    className={style.customSelect}
                                    width= '100px'
                                    menuPlacement="top"
                                    // styles={customStyles}
                                    onChange = {(e)=>changeUserCount(e)}
                                />
                            </Col>
                            <Col md="5">
                            </Col>
                        </Row>:
                        <></>
                    }

                    <Row className={style.user_selection}>
                        <Col md="4"></Col>
                        <Col md="4" className={style.planSelectionText}>
                            Select your billing cycle for '{plan_name} {user_count} seat(s)'
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                    <Row>
                        <Col md="3">
                        </Col>
                        <Col md="3">
                            <Card onClick={(e)=>selectBillingType("ANNUALY")} className={cx(style.customLicenceCard)}>
                                <CardBody>
                                    <CardTitle>
                                        {billing_type=="ANNUALY"?
                                            <div className={style.activatedPlan}>&#10003;</div> :
                                            <div className={style.listedPlan}></div> 
                                        }
                                        
                                        <div style={{marginTop:"-8px"}} className={style.subscriptionHeader}>
                                            <p className={style.billingTypeName}>Annual Billing</p>

                                            <p className={style.discountText}>Save &nbsp;
                                            {plan_discount} &nbsp;
                                            %</p>
                                        </div>
                                        <div className={style.priceHeader}>₹{user_count * annual_billing_per_user}<span className={style.luomContainer}>/mo</span></div>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card onClick={(e)=>selectBillingType("MONTHLY")} className={cx(style.customLicenceCard)}>
                                <CardBody>
                                    <CardTitle>
                                        {billing_type=="MONTHLY"?
                                            <div className={style.activatedPlan}>&#10003;</div> :
                                            <div className={style.listedPlan}></div> 
                                        }
                                        <div className={style.subscriptionHeader}>Month-to-month</div>
                                        <div className={style.priceHeader}>₹{user_count * monthly_billing_per_user}<span className={style.luomContainer}>/mo</span></div>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                        </Col>
                    </Row>
                    <Row className={style.user_selection}>
                        <Col md="4"></Col>
                        <Col md="4" className={style.continueBtnContainer}>
                            <Button onClick={(e)=>securePay()} className={style.continueBtn}>Continue</Button>
                            <p className={style.confirmPaymentScreen}>You will confirm the payment on next screen</p>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </>:
                <>
                    <Row className={style.user_selection}>
                        <Col md="4"></Col>
                        <Col md="4" className={style.continueBtnContainer}>
                            <Button onClick={(e)=>SendQuotation()} className={style.continueBtn}>Continue</Button>
                            <p className={style.confirmPaymentScreen}>
                                Enterprise licence starts from ₹{monthly_billing_per_user}/mo
                            </p>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </>
                
            }

            <Modal toggle={(e)=>toggleModal()} size="lg" isOpen={modalOpen}>
                <ModalHeader className={style.customModalHeader} >Compare Appbot Plans</ModalHeader>
                <ModalBody  className={style.customModalBody}>
                    <Table responsive bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                {
                                    allLicence.map((elem,index)=>{
                                        return(
                                            <th className={style.customTableHeader}>{elem.plan_name}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className={style.featureHeader} scope="row">Annual Billing</th>
                                {
                                    allLicence.map((childElem,childIndex)=>{
                                        return(
                                            <td className={style.planAttribute}>
                                                ₹{
                                                    childElem.user_count.match(/\d+/)[0] * childElem.annual_billing_per_user 
                                                } / mo
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={style.featureHeader} scope="row">Month-to-month</th>
                                {
                                    allLicence.map((childElem,childIndex)=>{
                                        return(
                                            <td className={style.planAttribute}>
                                                {
                                                    childElem.user_count.match(/\d+/)[0] * childElem.monthly_billing_per_user 
                                                } / mo
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={style.featureHeader} scope="row">User Count</th>
                                {
                                    allLicence.map((childElem,childIndex)=>{
                                        return(
                                            <td className={style.planAttribute}>
                                                {
                                                    childElem.user_count 
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={style.featureHeader} scope="row">Amount of sources</th>
                                {
                                    allLicence.map((childElem,childIndex)=>{
                                        return(
                                            <td className={style.planAttribute}>
                                                {
                                                    childElem.source_count 
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            <tr>
                                <th className={style.featureHeader} scope="row">Atomated Translations</th>
                                {
                                    allLicence.map((childElem,childIndex)=>{
                                        return(
                                            <td className={style.planAttribute}>
                                                {
                                                    childElem.automated_translation 
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                            
                            {
                                allLicence && allLicence.length>0 &&
                                allLicence[0].features_details.map((elem,index)=>{
                                    return(
                                        <tr>
                                            <th className={style.featureHeader} scope="row">{elem.feature_name}</th>
                                            {
                                                allLicence.map((childElem,childIndex)=>{
                                                    return(
                                                        <td>
                                                            {
                                                                childElem.features_details.find(item => { return item.feature_id == elem.feature_id }).feature_toggle == true?
                                                                <p className={style.activeItem}>&#10003;</p> : <p className={style.inactiveItem}>&#x2717;</p>
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default AllLicence;