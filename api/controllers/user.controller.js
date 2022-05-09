const userService = require("../services/user_masters.service");
const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /api/user/login:
 *  post:
 *      tags:
 *      - User
 *      summary: Login to Application
 *      description: User Login
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
 *                      - user_email
 *                      - user_password
 *                      properties:
 *                          user_email: 
 *                              type: string
 *                              default: mattar66@mailinator.com
 *                          user_password:
 *                              type: string
 *                              default: 123456 
 *                  
 */

/**
 * @swagger
 * /api/user/signup:
 *  post:
 *      tags:
 *      - User
 *      summary: Create Account
 *      description: User Signup
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
 *                      - user_email
 *                      - user_password
 *                      - user_name
 *                      properties:
 *                          user_email: 
 *                              type: string
 *                              default: mattar66@mailinator.com
 *                          user_password: 
 *                              type: string
 *                              default: 123456
 *                          user_name:
 *                              type: string
 *                              default: Maroof Attar 
 *                  
 */

/**
 * @swagger
 * /api/user/updateProfile:
 *  post:
 *      tags:
 *      - User
 *      summary: Update Profile
 *      description: Update User Profile
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
 *                      - user_email
 *                      - user_password
 *                      - user_name
 *                      properties:
 *                          user_email: 
 *                              type: string
 *                              default: mattar66@mailinator.com
 *                          user_password: 
 *                              type: string
 *                              default: 123456
 *                          user_name:
 *                              type: string
 *                              default: Maroof Attar 
 *                  
 */

/**
 * @swagger
 * /api/user/validEmail:
 *  post:
 *      tags:
 *      - User
 *      summary: Validate Email
 *      security:
 *          - bearerAuth: []
 *      description: Check if the email is already existswith another user 
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
 *                      - user_email
 *                      properties:
 *                          user_email: 
 *                              type: string
 *                              default: mattar66@mailinator.com
 */

/**
 * @swagger
 * /api/user/findTokenUser:
 *  get:
 *      tags:
 *      - User
 *      summary: Validate Token
 *      security:
 *          - bearerAuth: []
 *      description: Check if the email is already existswith another user 
 *      responses:
 *          "200": 
 *              description: "A Successful Response"
 *          "500":
 *              description: "Failure"
 */

router.post("/login", login);
router.post("/signup", signup);
router.post("/updateProfile", updateProfile);
router.post("/validEmail", validEmail);
router.get("/findTokenUser", findTokenUser);
router.post("/addUser", addUser);

function login(req, res, next){
    userService.login(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function signup(req, res, next){
    userService.signup(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function updateProfile(req, res, next){
    userService.updateProfile(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function validEmail(req, res, next){
    userService.validEmail(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function findTokenUser(req, res, next){
    userService.findTokenUser(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

function addUser(req, res, next){
    userService.addUser(req, res).then((resp)=>{
        res.json(resp);
    }).catch(err=>{
        res.json(err);
    })
}

module.exports = router;