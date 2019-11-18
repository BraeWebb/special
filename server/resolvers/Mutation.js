const lodash = require("lodash");

const reports = require("./mutation/reports");
const queue = require("./mutation/queue");
const files = require("./mutation/files");

module.exports = {
  Mutation: lodash.merge(reports, queue, files)
};
