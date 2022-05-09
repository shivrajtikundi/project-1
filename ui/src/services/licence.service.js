import {helperService} from "./helper.service";
import {apiUrl} from "../constants";

export const licenceService = {    
    getAllLicence,
    getUserLicence,
    createQuotation
};

function createQuotation(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}licence/createQuotation`, requestOptions).then(helperService.handleResponse);
}


function getAllLicence(data){
    const requestOptions = {
        method: 'GET',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}licence/getAllLicence`, requestOptions).then(helperService.handleResponse);
}

function getUserLicence(){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
    };
    return fetch(`${apiUrl}user_licence/getCurrentUserLicenceDetails`, requestOptions).then(helperService.handleResponse);
}
