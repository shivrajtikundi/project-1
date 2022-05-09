const express = require("express");
const app = express();
var opn = require('opn');
const os = require('os');
  

const cors =  require("cors");
const http = require("http");
const bodyparser = require("body-parser");
const errorHandler = require('./helpers/error-handler');
const swaggerJsDoc = require("swagger-jsdoc");
app.use(bodyparser.json());
const jwt = require('./helpers/jwt.helper');
app.use(cors());
const swaggerUi = require("swagger-ui-express")
const swaggerOptions = {
    swaggerDefinition: {
        openapi:'3.0.0',
        info: {
            version: "1.0.0",
            title: "Appbot API",
            contact:{
                name:'101 Logix',
                url:'https://101logix.com',
                email:'maroof@101logix.com'
            },
            servers: ["http://localhost:5000"]
        },
        components:{
            securitySchemes :{ 
                bearerAuth: {
                    type: "http", 
                    scheme: "bearer", 
                    bearer: "JWT"
                } 
            }
        }
    },
    apis: [
        "controllers/user.controller.js",
        "controllers/app.controller.js"
    ]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(jwt());
app.use(errorHandler);
const server = http.createServer(app);
app.use("/api/", require("./controllers/main.controller"));

server.listen("5000", function(){
    // opn("http://localhost:5000/api/docs");
    console.log("Server listening at 5000");
});