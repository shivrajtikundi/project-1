const appService = require("../services/app.service");
const express = require("express");
const router = express.Router();
//test commit on development branch

/**
 * @swagger
 * /api/app/searchAppInPlayStore:
 *  post:
 *      tags:
 *      - App
 *      summary: Search App(s) in Play Store
 *      description: Play Store Search
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - name
 *                      properties:
 *                          name: 
 *                              type: string
 *                              default: facebook
 *                  
 */

/**
 * @swagger
 * /api/app/getPlayStoreAppDetails:
 *  post:
 *      tags:
 *      - App
 *      summary: Get App Details From Play Store
 *      description: Play Store App Details
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - appId
 *                      properties:
 *                          appId: 
 *                              type: string
 *                              default: "com.netmarble.mherosgb"
 *                  
 */

/**
 * @swagger
 * /api/app/searchAppInAppStore:
 *  post:
 *      tags:
 *      - App
 *      summary: Search App(s) in App Store
 *      description: App Store Search
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - name
 *                      properties:
 *                          name: 
 *                              type: string
 *                              default: "avengers"
 *                  
 */

/**
 * @swagger
 * /api/app/getAppStoreAppDetails:
 *  post:
 *      tags:
 *      - App
 *      summary: Get App Details From App Store
 *      description: App Store Details
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - appId
 *                      properties:
 *                          appId: 
 *                              type: string
 *                              default: "com.netmarble.mherosgb"
 *                  
 */

/**
 * @swagger
 * /api/app/getReviewsOfPlayStoreApp:
 *  post:
 *      tags:
 *      - App
 *      summary: Get App Reviews from Play store
 *      description: App Reviews
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - appId
 *                      - sort
 *                      properties:
 *                          appId: 
 *                              type: string
 *                              default: "com.netmarble.mherosgb"
 *                          sort:
 *                              type: string
 *                              default: "new"
 *                  
 */

/**
 * @swagger
 * /api/app/getReviewsOfAppStoreApp:
 *  post:
 *      tags:
 *      - App
 *      summary: Get App Reviews from App store
 *      description: App Reviews
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - appId
 *                      - sort
 *                      - req_page
 *                      properties:
 *                          appId: 
 *                              type: string
 *                              default: "com.netmarble.mherosgb"
 *                          sort:
 *                              type: string
 *                              default: "new"
 *                          req_page:
 *                              type: string
 *                              default: 1
 *                  
 */

/**
 * @swagger
 * /api/app/getSuggestionFromPlayStore:
 *  post:
 *      tags:
 *      - App
 *      summary: Get suggestions according to your search from Play Store
 *      description: Return 5 suggestions according to the provided Keywords
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - name
 *                      properties:
 *                          name: 
 *                              type: string
 *                              default: facebook
 *                  
 */

/**
 * @swagger
 * /api/app/getSuggestionFromAppStore:
 *  post:
 *      tags:
 *      - App
 *      summary: Get suggestions according to your search from App Store
 *      description: Return 5 suggestions according to the provided Keywords
 *      security:
 *          - bearerAuth : []
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                      - name
 *                      properties:
 *                          name: 
 *                              type: string
 *                              default: facebook
 *                  
 */


router.post("/searchAppInPlayStore", searchAppInPlayStore);
router.post("/getPlayStoreAppDetails", getPlayStoreAppDetails);
router.post("/searchAppInAppStore", searchAppInAppStore);
router.post("/getAppStoreAppDetails", getAppStoreAppDetails);
router.post("/getReviewsOfPlayStoreApp", getReviewsOfPlayStoreApp);
router.post("/getSuggestionFromPlayStore", getSuggestionFromPlayStore);
router.post("/getReviewsOfAppStoreApp", getReviewsOfAppStoreApp);
router.post("/getSuggestionFromAppStore", getSuggestionFromAppStore);
router.post("/addAppSource", addAppSource);
router.get("/getAllSourceUserWise", getAllSourceUserWise);


function searchAppInPlayStore(req, res, next){
    appService.searchAppInPlayStore(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getPlayStoreAppDetails(req, res, next){
    appService.getPlayStoreAppDetails(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function searchAppInAppStore(req, res, next){
    appService.searchAppInAppStore(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getAppStoreAppDetails(req, res, next){
    appService.getAppStoreAppDetails(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getReviewsOfPlayStoreApp(req, res, next){
    appService.getReviewsOfPlayStoreApp(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getSuggestionFromPlayStore(req, res, next){
    appService.getSuggestionFromPlayStore(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getReviewsOfAppStoreApp(req, res, next){
    appService.getReviewsOfAppStoreApp(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getSuggestionFromAppStore(req, res, next){
    appService.getSuggestionFromAppStore(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function addAppSource(req, res, next){
    appService.addAppSource(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function getAllSourceUserWise(req, res, next){
    appService.getAllSourceUserWise(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;