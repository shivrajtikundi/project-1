const db = require("../helpers/db");
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const { execPath } = require("process");
const { Promise } = require("mongoose");
const gplay = require('google-play-scraper');
const store = require('app-store-scraper');
const gplay_aso = require('aso')('gplay');
const itunes_aso = require('aso')('itunes');
const AppSearch = db.AppSearch;
const AppSource = db.AppSource;
const mongoose = require('mongoose');


const appService = {
    searchAppInPlayStore,
    getPlayStoreAppDetails,
    searchAppInAppStore,
    getAppStoreAppDetails,
    getReviewsOfPlayStoreApp,
    getSuggestionFromPlayStore,
    getReviewsOfAppStoreApp,
    getSuggestionFromAppStore,
    addAppSource,
    getAllSourceUserWise
}

function convertToObjId(str){
    return mongoose.Types.ObjectId(str);
}

function getSuggestionFromAppStore(req, res){
    return new Promise( async (resolve, reject)=>{
        var appname = req.body.name
        try{
            store.search({
                term: appname
            }).then(res=>{
                var suggestedData = [];
                res.length > 0 && res.forEach((elem, index)=>{
                    if(suggestedData.length >= 5){
                        return false;
                    }
                    var {title} = elem;
                    var indexOfThehint = title.toLowerCase().indexOf(appname.toLowerCase());
                    if(indexOfThehint == 0){
                        suggestedData.push(elem);
                    }
                })
                return resolve({"success":true, "data":suggestedData});
            }).catch(err=>{
                console.log(err)
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getSuggestionFromPlayStore(req, res){
    return new Promise( async (resolve, reject)=>{
        var appname = req.body.name
        try{
            gplay.search(
                {
                    term: appname
                }
            ).then(res=>{
                var suggestedData = [];
                res.length > 0 && res.forEach((elem, index)=>{
                    if(suggestedData.length >= 5){
                        return false;
                    }
                    var {title} = elem;
                    var indexOfThehint = title.toLowerCase().indexOf(appname.toLowerCase());
                    if(indexOfThehint == 0){
                        suggestedData.push(elem);
                    }
                })
                return resolve({"success":true, "data":suggestedData});
            }).catch(err=>{
                console.log(err)
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            console.log(err);
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getReviewsOfAppStoreApp(req, res){
    return new Promise( async (resolve, reject)=>{
        var appId = req.body.appId;
        var sort = (req.body.sort)?req.body.sort:"";
        var req_page = (req.body.req_page && req.body.req_page >= 1 && req.body.req_page <= 10)?req.body.req_page:1;
        var paginateToken = (req.body.paginate_token && req.body.paginate_token!="")?req.body.paginate_token:null;
        if( sort.toLowerCase() == "recent" || sort.toLowerCase() == ""){
            sort = store.sort.RECENT;
        }else if(sort.toLowerCase() == "helpfulness" || sort.toLowerCase() == "helpfull"){
            sort = store.sort.HELPFUL;
        }else{
            sort = store.sort.RECENT;
        }
        try{
            store.reviews({
                appId: appId,
                sort: sort,
                page: req_page,
                nextPaginationToken:paginateToken,
                country: "in"
            }).then(res=>{
                return resolve({"success":true, "data":res,"nextPaginationToken":res.nextPaginationToken});
            }).catch(err=>{
                console.log(err)
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getReviewsOfPlayStoreApp(req, res){
    return new Promise( async (resolve, reject)=>{
        var appId = req.body.appId;
        var sort = (req.body.sort)?req.body.sort:"";
        var paginateToken = (req.body.paginate_token && req.body.paginate_token!="")?req.body.paginate_token:null;
        if(sort.toLowerCase() == "new" || sort.toLowerCase() == "newest" || sort.toLowerCase() == ""){
            sort = gplay.sort.NEWEST;
        }else if(sort.toLowerCase() == "rate" || sort.toLowerCase() == "rating"){
            sort = gplay.sort.RATING;
        }else if(sort.toLowerCase() == "helpfulness" || sort.toLowerCase() == "helpfull"){
            sort = gplay.sort.HELPFULNESS;
        }else{
            sort = gplay.sort.NEWEST;
        }
        try{
            gplay.reviews({
                appId: appId,
                sort: sort,
                num: 200,
                paginate: true,
                nextPaginationToken: paginateToken,
                country: "in",
                lang: "en"
            }).then(res=>{
                return resolve({"success":true, "data":res.data,"nextPaginationToken":res.nextPaginationToken});
            }).catch(err=>{
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getPlayStoreAppDetails(req, res){
    return new Promise( async (resolve, reject)=>{
        var appId = req.body.appId
        try{
            gplay.app({
                appId: appId
            }).then(res=>{
                return resolve({"success":true, "data":res});
            }).catch(err=>{
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function searchAppInPlayStore(req, res){
    return new Promise( async (resolve, reject)=>{
        var appname = req.body.name
        try{
            gplay.search({
                term: appname
            }).then(async res=>{
                var payload = {};
                payload.search_term = appname;
                payload.searched_store = 'GOOGLE_PLAY_STORE';
                payload.searched_by = convertToObjId(req.userdetail._id);
                payload.team_id = convertToObjId(req.userdetail.team_id);
                var appSearchedObj = new AppSearch(payload);
                await appSearchedObj.save();
                return resolve({"success":true, "data":res});
            }).catch(err=>{
                console.log(err)
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getAppStoreAppDetails(req, res){
    return new Promise( async (resolve, reject)=>{
        var id = req.body.appId
        try{
            store.app({
                id: id
            }).then(res=>{
                return resolve({"success":true, "data":res});
            }).catch(err=>{
                console.log(err)
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function searchAppInAppStore(req, res){
    return new Promise( async (resolve, reject)=>{
        var appname = req.body.name
        try{
            store.search({
                term: appname,
            }).then(async res=>{
                var payload = {};
                payload.search_term = appname;
                payload.searched_store = 'ITUNES_APP_STORE';
                payload.searched_by = convertToObjId(req.userdetail._id);
                payload.team_id = convertToObjId(req.userdetail.team_id);
                var appSearchedObj = new AppSearch(payload);
                await appSearchedObj.save();
                return resolve({"success":true, "data":res});
            }).catch(err=>{
                return reject({"success":false, "error":"Error Occured"});
            })
        }catch(err){
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}

function getAllSourceUserWise(req, res){
    return new Promise(async (resolve, reject)=>{
        var userid = req.userdetail._id;
        var team_id = req.userdetail.licence_details.licenceid;
        if(userid!="" && team_id!=""){
            try{
                var query = {};
                query['team_id'] = convertToObjId(team_id);
                query['userid'] = convertToObjId(userid);
                query['is_deleted'] = false;

                AppSource.aggregate([
                    {$match: query}
                ]).then(res=>{
                    return resolve({"success":true,"data": res});
                }).catch(err=>{
                    return reject({"success":false,"error":"Error occured"});
                })
            }catch(err){
                return reject({"success":false,"error":"Error occured"});
            }
        }else{
            return reject({"success":false,"error":"Error occured"});
        }
    });
}

function addAppSource(req, res){
    return new Promise( async (resolve, reject)=>{
        var {title, store_type, id, appId, developer, developerId, free, url, icon} = req.body;
        var added_by = req.userdetail._id;
        var countOfSource = req.userdetail.licence_details.source_count;
        var team_id = req.userdetail.team_id;
        try{
            if(title!="" && store_type!="" && appId!="" && developer!="" && developerId!="" && url!="" && icon!=""){
                //check if source count does not exceeded
                var countQuery = {};
                countQuery["is_deleted"] = false;
                countQuery["team_id"] = convertToObjId(team_id);
                AppSource.aggregate([
                    { $match :  countQuery}
                ]).then(async out=>{
                    if(out.length<countOfSource){
                        //check if alredy an existing source
                        var query = {};
                        query["is_deleted"] = false;
                        query["store_type"] = store_type;
                        query["app_bundle_id"] = appId;
                        query["team_id"] = convertToObjId(team_id);
                        AppSource.aggregate([
                            { $match :  query}
                        ]).then(async res=>{

                            if(res.length <= 0){
                                var payload = {};
                                payload.app_title = title;
                                payload.store_type = store_type;
                                payload.app_id = id;
                                payload.app_bundle_id = appId;
                                payload.app_developer = developer;
                                payload.app_developer_id = developerId;
                                payload.app_url = url;
                                payload.app_icon = icon;
                                payload.added_by = convertToObjId(added_by);
                                payload.team_id = convertToObjId(team_id);
                                var appSourceObj = new AppSource(payload);
                                await appSourceObj.save();
                                return resolve({"success":true});
                            }else{
                                return reject({"success":false, "error":"This source is already added"});
                            }

                        }).catch(err=>{
                            console.log(err)
                            return reject({"success":false, "error":"Error Occured"});
                        })
                    }else{
                        return reject({"success":false, "error":"Sorry maximum count of adding source exceed upgrade your licence to continue"});
                    }

                }).catch(err=>{
                    console.log(err)
                    return reject({"success":false, "error":"Error Occured"});
                })

            }else{
                return reject({"success":false, "error":"Mandatory field(s) missing"});
            }
        }catch(err){
            console.log(err)
            return reject({"success":false, "error":"Error Occured"});
        }
    })
}


module.exports = appService;