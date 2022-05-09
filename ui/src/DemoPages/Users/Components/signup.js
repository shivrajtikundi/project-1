import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import ToggleSwitch from "./ToggleSwtch";
import {userService, alertService} from "../../../services/index";

const Signup = () => {
    const [{user_email, user_name, user_password, user_c_password, terms_and_condition_accepted, b_pass_match},
        setState] = useState({
            user_email: "",
            user_name: "",
            user_password:"",
            user_c_password:"",
            terms_and_condition_accepted: false,
            b_pass_match: true
        })
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }

    const handleCheckboxChange = (event) =>{
        setState((prevState)=>({
            ...prevState, terms_and_condition_accepted: !prevState.terms_and_condition_accepted
        }))
    }


    const signup = () => {
        if(user_email!="" && user_name!="" && user_password!=""){
            var req = {
                user_email:user_email,
                user_name:user_name,
                user_password:user_password
            }
    
            userService.signup(req).then(async (response) => {
                if(response.success==true){
                    alertService.throwSuccess("Successfully Sign Up");
                    window.location = "/users/login";
                }else{
                    alertService.throwError(response.error);
                    return;
                }
            }).catch(error => {
                alertService.throwWarning(error);
                return;
            });
        }else{
            alertService.throwError("Mandatory Fields Missing");
            return;
        }

    }

    const matchConfirmPass = () =>{
        if(user_password!="" && user_c_password!=""){
            if(user_password==user_c_password){
                setState((prevState) => ({
                    ...prevState,
                    b_pass_match: true
                }))
            }else{
                setState((prevState) => ({
                    ...prevState,
                    b_pass_match: false
                }))
            }
        }
    }
    return(
        <Fragment>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <p className={style.loginHeader}>appbot</p>
                    <p className={style.loginWelcome}>Hi there! 👋 Let's get you set up</p>
                    <Card>
                        <CardBody className={style.customPaddingCardBody}>
                            <FormGroup>
                                <Label for="user_name">First Name & Last Name</Label>
                                <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_name} type="user_name" name="user_name" id="user_name" placeholder="First Name & Last Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Work Email Address</Label>
                                <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_email} type="email" name="user_email" id="user_email" placeholder="Work Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password (more than 6 characters) 
                                    {b_pass_match===false?<span style={{color:"red"}}> (Not Matched) </span>:""}
                                </Label>
                                <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_password} type="password" name="user_password" id="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="c_password">Confirm Password</Label>
                                <Input  onBlur={(e)=>matchConfirmPass(e)} onChange={(e)=>handleChange(e)} className={style.customInput} value={user_c_password} type="password" name="user_c_password" id="c_password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Button 
                                    disabled={
                                        (user_password!="" && user_c_password!=""
                                        && user_password == user_c_password
                                        && terms_and_condition_accepted == true)?false:true}
                                    className={style.loginBtn}
                                    onClick={(e)=>signup()}
                                >
                                        Start Free Trial
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <div onClick={(e)=>handleCheckboxChange()} className={style.ToggleSwitch}>
                                        {terms_and_condition_accepted?
                                            <div className={style.knobActive} />:
                                            <div className={style.knob} />
                                        }
                                        
                                    </div>
                                    <div className={style.termsAndConditionText}>
                                        I have read and agree to the <Link className={style.customLinkSignUp}>Terms</Link> including the DPA and the <Link className={style.customLinkSignUp}>Privacy Policy</Link>
                                    </div>
                                </div>
                                
                            </FormGroup>
                            <FormGroup>
                                <div className={style.customSignupLinkSecondary}>
                                    Already got an account? <Link to="/users/login" className={style.customLink}>Sign In</Link>
                                </div>
                            </FormGroup>
                            
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4"></Col>
            </Row>
        </Fragment>
    )
}

export default Signup;