const lodash = require("lodash");

const reports = require("./mutation/reports");
const queue = require("./mutation/queue");

module.exports = {
  Mutation: lodash.merge(reports, queue)
};
