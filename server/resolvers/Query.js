const lodash = require("lodash");

const user = require("./query/user");
const languages = require("./query/languages");
const reports = require("./query/reports");
const cases = require("./query/cases");

const queue = require("./query/queue");

module.exports = {
  Query: lodash.merge(user, languages, reports, cases, queue),
};
