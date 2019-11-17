const lodash = require("lodash");

const reports = require("./subscription/reports");
const queue = require("./subscription/queue");

module.exports = {
  Subscription: lodash.merge(reports, queue),
};
