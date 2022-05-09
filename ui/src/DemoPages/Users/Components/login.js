import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';

const Login = () => {
    const [{user_email, user_password},
        setState] = useState({
            user_email: "",
            user_password:""
        })
    
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }



    const login = () => {
        if(user_email!="" && user_password!=""){
            var req = {
                user_email:user_email,
                user_password:user_password
            }
    
            userService.login(req).then(async (response) => {
                if(response.success==true){
                    Cookies.set('token', response.token);
                    alertService.throwSuccess("Successfully Logged in");
                    window.location = "/dashboards";
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

    return(
        <Fragment>
            <div className={style.customLoginFormContainer}>
                <div>
                    <p className={style.loginHeader}>appbot</p>
                    <p className={style.loginWelcome}>Welcome Back 👋</p>
                    <Card>
                        <CardBody className={style.customPaddingCardBody}>
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_password} className={style.customInput} type="password" name="user_password" id="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={(e)=>login()} className={style.loginBtn}>Sign In</Button>
                            </FormGroup>
                            <FormGroup>
                                <div className={style.customSignupLink}>
                                    New to Appbot? <Link to="/users/signup" className={style.customLink}>Create an Account</Link>
                                </div>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Button className={style.forgotPassBtn}>I forgot my password</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;