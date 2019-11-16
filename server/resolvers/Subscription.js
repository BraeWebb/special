const lodash = require("lodash");

const reports = require("./subscription/reports");

module.exports = {
  Subscription: lodash.merge(reports),
};
