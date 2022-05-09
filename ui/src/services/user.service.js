import {helperService} from "./helper.service";
import {apiUrl} from "../constants";

export const userService = {    
    login,  
    signup,
    findTokenUser
};

function login(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}user/login`, requestOptions).then(helperService.handleResponse);
}

function signup(data){
    const requestOptions = {
        method: 'POST',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}user/signup`, requestOptions).then(helperService.handleResponse);
}

function findTokenUser(){
    const requestOptions = {
        method: 'GET',
        headers:helperService.getHeaderData(),
    };
    return fetch(`${apiUrl}user/findTokenUser`, requestOptions).then(helperService.handleResponse);
}
