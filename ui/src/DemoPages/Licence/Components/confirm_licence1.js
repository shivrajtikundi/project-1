import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, Table  } from 'reactstrap';
import style from "../style.module.css";
import {licenceService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import cx from 'classnames';
import Select from 'react-select';
import CreditCardInput from 'react-credit-card-input';

const ConfirmLicence = () => {
    const [{
        cvc,
        expirydate,
        cardnumber
    }, setState] = useState({
        cvc :"",
        expirydate:"",
        cardnumber:""
    })

    // const handleCardCVCChange = (e) => {
    //     setState((prevState) => ({
    //         ...prevState,
    //         cvc: e.value
    //     }));
    // }

    // const handleCardExpiryChange = (e) => {
    //     setState((prevState) => ({
    //         ...prevState,
    //         expirydate: e.value
    //     }))
    // }

    // const handleCardNumberChange = (e) => {
    //     setState((prevState) => ({
    //         ...prevState,
    //         cardnumber: e.value
    //     }))
    // }


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
                            </CardTitle>
                            <Form>
                                <FormGroup>
                                    <Label for="nameOnCard">Name On Card</Label>
                                    <Input type="text" name="name_on_card" id="nameOnCard" placeholder="Name On Card" />
                                </FormGroup>
                                <FormGroup>
                                    <CreditCardInput
                                        className = {style.cardInputs}
                                        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                                            <Input
                                                {...props}
                                                onChange={handleCardCVCChange(e=>{
                                                    var card_cvc = e.target.value;
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        cvc: card_cvc
                                                    }));
                                                })}
                                                name="cvc"
                                                value={cvc}
                                            />
                                        )}
                                        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
                                            <Input
                                                {...props}
                                                onChange={handleCardExpiryChange(e=>{
                                                    var expiry_date = e.target.value
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        expirydate: expiry_date
                                                    }));
                                                })}
                                                name="expirydate"
                                                value={expirydate}
                                            />
                                        )}
                                        cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
                                            <Input
                                                {...props}
                                                onChange={handleCardNumberChange(e=>{
                                                    var card_number = e.target.value;
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        cardnumber: card_number
                                                    }));
                                                })}
                                                name="cardnumber"
                                                value={cardnumber}
                                            />
                                        )}
                                    />
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3"></Col>
            </Row>
        </Fragment>
    )
}

export default ConfirmLicence;