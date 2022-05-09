import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AllLicence from "./Components/all_licence";
import ConfirmLicence from './Components/confirm_licence';
import RazorPayGateway from './Components/payment_gateway';


const Licence = ({match}) => {
    return(
        <Fragment>
            <Route path={`${match.url}/all_licence`} >
                <AllLicence />
            </Route>
            <Route path={`${match.url}/confirm_plan`} >
                <ConfirmLicence />
            </Route>
            <Route path={`${match.url}/razorpay`} >
                <RazorPayGateway />
            </Route>
        </Fragment>
    );

};

export default Licence;