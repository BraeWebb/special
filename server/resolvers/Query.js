const lodash = require("lodash");

const user = require("./query/user");
const languages = require("./query/languages");
const reports = require("./query/reports");

module.exports = {
  Query: lodash.merge(user, languages, reports),
};
