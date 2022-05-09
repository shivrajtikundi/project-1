import {token} from "../constants"
export const helperService = {handleResponse, getHeaderData, getHeaderDataForMultipart}

function handleResponse(response) {
    return response.text().then(text => {
         const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // if(window.location.href.indexOf("login")){
                //     return;
                // }else{
                //     window.location.replace("/");
                // }
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
function getHeaderData(){
    var headerData = {'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':"Bearer "+token};
    return headerData;
 }

function getHeaderDataForMultipart(){
    var headerData = {'Accept': 'application/json, text/plain, */*',
    'Authorization':"Bearer "+token};
    return headerData;
 } 

