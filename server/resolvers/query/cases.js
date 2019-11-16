const { Case, Report } = require("../../schema/model");

async function getCases(report, status) {
  report = await Report.findOne({
    where: {
      id: report
    }
  });

  if (report === null) {
    return [];
  }

  if (status === undefined) {
    return report.getCases();
  }

  return report.getCases({
    where: {status: status}
  });
}

async function getCase(report, number) {
  report = await Report.findOne({
    where: {
      id: report
    }
  });

  if (report === null) {
    return null;
  }

  let cases = await report.getCases({
    where: {
      number: number
    }
  });

  if (cases.length < 1) {
    return null;
  }

  return cases[0];
}

module.exports = {
  cases: (root, args, context) => getCases(args.report, args.status),
  case: (root, args, context) => getCase(args.report, args.id)
};
