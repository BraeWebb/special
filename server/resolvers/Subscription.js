const lodash = require("lodash");

const reports = require("./subscription/reports");
const queue = require("./subscription/queue");
const files = require("./subscription/files");

module.exports = {
  Subscription: lodash.merge(reports, queue, files),
};
