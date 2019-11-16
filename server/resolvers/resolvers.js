const lodash = require("lodash");

const User = require("./types/User");
const Report = require("./types/Report");
const Case = require("./types/Case");
const StudentCase = require("./types/StudentCase");

const Query = require("./Query");
const Mutation = require("./Mutation");
const Subscription = require("./Subscription");

module.exports = lodash.merge(
  User,
  Report,
  Case,
  StudentCase,
  Query,
  Mutation,
  Subscription
);
