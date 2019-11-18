const lodash = require("lodash");

const Case = require("./Case");
const Report = require("./Report");

module.exports = lodash.merge(Case, Report);
