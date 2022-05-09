const express = require("express");
const Route = express.Router();

const UserController = require("./user.controller");
const FeatureController = require("./feature.controller");
const LicenceController = require("./licence.controller");
const UserLicenceController = require("./user_licence.controller");
const CountryController = require("./country.controller");
const PaymentController = require("./payment.controller");
const AppController = require("./app.controller");

Route.use("/user", UserController);
Route.use("/feature", FeatureController);
Route.use("/licence", LicenceController);
Route.use("/user_licence", UserLicenceController);
Route.use("/country", CountryController);
Route.use("/payment", PaymentController);
Route.use("/app", AppController);

module.exports = Route;