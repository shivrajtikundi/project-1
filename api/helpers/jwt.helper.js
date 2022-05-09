const expressJwt = require("express-jwt");
const config = require("../config.json");
const jsonwebtoken = require("jsonwebtoken");

function jwt() {
    const privateKey = config.secret;
    return expressJwt({secret:privateKey, isRevoked, algorithms:['HS256']}).unless({
        path:[
            '/api/docs',
            '/api/user/login',
            '/api/user/signup',
            '/api/country/createCountry',
            '/api/country/getAllCountry',
        ]
    })
}

function isRevoked(req, res, next) {
    const token = req.headers.authorization;
    const privateKey = config.secret;
    var tokenArr = token.split(" ");
    if (!token) {
        var respJson = {"success":false,"error":"Authentication failed"};
        return res.status(403).send(respJson);
    }
    try {
        var decoded = jsonwebtoken.verify(tokenArr[1],privateKey);
        req.userdetail = decoded;
    } catch(err) {
        var respJson = {"error":true,"error":"Cannot authenticate token"};
        return res.status(403).send(respJson);
    }

    return next();
}

module.exports = jwt;