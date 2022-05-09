import React, {Fragment, useState} from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import { change } from 'redux-form';
import style from "../style.module.css";

const Profile = () => {
    const [{
        user_name,
        user_email,
        user_pass,
        edit_btn_text,
        inf_read_only,
        modalOpen
    }, setState] = React.useState(
        {
            user_name:"Dhrubajyoti Adak",
            user_email:"dhruba@mailinator.com",
            user_pass:"123456789",
            edit_btn_text: "Edit Profile Details",
            inf_read_only: true,
            modalOpen:false
        }
    );
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }
    const toggleEditableMode = () =>{
        setState((prevState) => ({
            ...prevState,
            inf_read_only: !inf_read_only
        }))
    }
    const toggleModal = () => {
        setState((prevState) => ({
            ...prevState,
            modalOpen: !modalOpen
        }))
    }
    

    return(
        <Fragment>
            <Row>
                <Col md="12">
                    <p className={style.profleHeading}>Profile</p>
                    <p className={style.profleSubHeading}>Change your name, email and password</p>
                </Col>
                <Col md="12">
                    <Card>
                        <CardHeader className={style.customCardHeader}>
                            Account Details
                        </CardHeader>
                        <CardFooter className={style.customCardFooter}>
                            <Row className={style.profileInfo}>
                                <Col md="2" className={style.profileInfoHeader}>
                                    Name
                                </Col>    
                                <Col md="10">
                                    {inf_read_only?
                                        <Input className={style.customInput} readOnly={true} onChange={(e)=>handleChange(e)} placeholder='Email' name="user_name"  value={user_name}></Input>:
                                        <Input onChange={(e)=>handleChange(e)} placeholder='Name' name="user_name"  value={user_name}></Input>
                                    }   
                                </Col>    
                            </Row>
                        </CardFooter>
                        <CardFooter className={style.customCardFooter}>
                            <Row className={style.profileInfo}>
                                <Col md="2" className={style.profileInfoHeader}>
                                    Email
                                </Col>    
                                <Col md="10">
                                    {inf_read_only?
                                        <Input className={style.customInput} readOnly={true} onChange={(e)=>handleChange(e)} placeholder='Email' name="user_email"  value={user_email}></Input>:
                                        <Input onChange={(e)=>handleChange(e)} placeholder='Email' name="user_email"  value={user_email}></Input>
                                    }
                                </Col>    
                            </Row>
                        </CardFooter>
                        <CardFooter className={style.customCardFooter}>
                            <Row className={style.profileInfo}>
                                <Col md="2" className={style.profileInfoHeader}>
                                    Password
                                </Col>    
                                <Col md="10">
                                    {inf_read_only?
                                        <Input className={style.customInput} readOnly={true} type="password" onChange={(e)=>handleChange(e)} placeholder='Password' name="user_pass"  value={user_pass}></Input>:
                                        <Input type="password" onChange={(e)=>handleChange(e)} placeholder='Password' name="user_pass"  value={user_pass}></Input>
                                    }
                                </Col>    
                            </Row>
                        </CardFooter>
                        <CardFooter className={style.customBtnContainer}>
                            <Row >
                                {inf_read_only?
                                    <Fragment>
                                        <Col md="2">
                                            <Button onClick={(e)=>toggleEditableMode()} className={style.customBtnForProfileUpdate}>
                                                {inf_read_only?"Edit Profile Details":"Save Profile Details"}
                                            </Button>
                                        </Col>
                                        <Col md="10">
                                            <Button onClick={(e)=>toggleModal()} className={style.customBtnForPasswordUpdate}>
                                                Change Password
                                            </Button>
                                        </Col>
                                    </Fragment>:
                                    <Fragment>
                                        <Col md="2">
                                            <Button onClick={(e)=>toggleEditableMode()} className={style.customBtnForProfileUpdate}>
                                                {inf_read_only?"Edit Profile Details":"Save Profile Details"}
                                            </Button>
                                        </Col>
                                        <Col md="10">
                                            <Button onClick={(e)=>toggleEditableMode()} className={style.customBtnForProfileUpdate}>
                                                Cancel Editing
                                            </Button>
                                        </Col>
                                    </Fragment>
                                }
                                    

                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modalOpen}>
                <ModalHeader className={style.customModalHeader} >Confirm Password</ModalHeader>
                <ModalBody className={style.customModalBody}>
                    <FormGroup>
                        <Label className={style.customLabel} for="pass">Enter Your Current Password</Label>
                        <Input className={style.customConfirmPassInput} type="password" name="pass" id="pass" placeholder="Enter Your Current Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label className={style.customLabel} for="c_pass">Enter Your New Password</Label>
                        <Input className={style.customConfirmPassInput} type="password" name="c_pass" id="c_pass" placeholder="Enter Your New Password" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className={style.customModalFooter}>
                    <Row style={{display:"block", paddingLeft:"15px", paddingRight:"15px"}}>
                        <Button className={style.savePassBtn} onClick={(e)=>toggleModal()}>Save Password</Button>
                        <Button className={style.cancelPassBtn} color="secondary" onClick={(e)=>toggleModal()}>Cancel</Button>
                    </Row>

                </ModalFooter>
            </Modal>
        </Fragment>
    );
}


export default Profile;