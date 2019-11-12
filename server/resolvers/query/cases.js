const Case = require("../../schema/Case");


module.exports = {
  cases: (root, args, context) => getUserReports(args.status, context.currentUser),
  case: (root, args, context) => getReport(args.id)
};
