const { Report } = require("../../schema/model");


function getUserReports(status, user) {
  if (status === undefined) {
    return user.getReports();
  }

  return user.getReports({
    where: {status: status}
  });
}

function getReport(id) {
  return Report.findOne({
    where: {
      id: id
    }
  });
}

module.exports = {
  reports: (root, args, context) => getUserReports(args.status, context.currentUser),
  report: (root, args, context) => getReport(args.id)
};
