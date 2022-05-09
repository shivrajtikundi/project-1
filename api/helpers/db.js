const config = require("../config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = {
    Users: require("../models/user_master.model"),
    Features: require("../models/feature.model"),
    Licence: require("../models/licence.model"),
    UserLicence: require("../models/user_licence.model"),
    Country: require("../models/country.model"),
    Payment: require("../models/payment.model"),
    Quotation: require("../models/quotation.model"),
    AppSearch: require("../models/app.model"),
    AppSource: require("../models/app_source.model"),
    Teams : require("../models/team.model")
}