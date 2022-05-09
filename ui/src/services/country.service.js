import {helperService} from "./helper.service";
import {apiUrl} from "../constants";

export const countryService = {    
    getAllCountry
};

function getAllCountry(data){
    const requestOptions = {
        method: 'GET',
        headers:helperService.getHeaderData(),
        body:JSON.stringify(data)
    };
    return fetch(`${apiUrl}country/getAllCountry`, requestOptions).then(helperService.handleResponse);
}
