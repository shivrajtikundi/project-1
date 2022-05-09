import {helperService} from "./helper.service";
import {apiUrl} from "../constants";

export const appService = {    
    searchAppInAppStore,
    searchAppInPlayStore,
    addAppSource
};

function searchAppInAppStore(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}app/searchAppInAppStore`, requestOptions).then(helperService.handleResponse);
}

function searchAppInPlayStore(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}app/searchAppInPlayStore`, requestOptions).then(helperService.handleResponse);
}

function addAppSource(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}app/addAppSource`, requestOptions).then(helperService.handleResponse);
}

