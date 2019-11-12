const lodash = require("lodash");

const reports = require("./mutation/reports");

module.exports = {
  Mutation: lodash.merge(reports)
};
