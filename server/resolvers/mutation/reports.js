const Promise = require('bluebird');

const generateId = require("../../util/id");

const { Case, StudentCase, Report, ReportRequest } = require("../../schema/model");

const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

function createRequest(args) {
  return ReportRequest.create({
    file: args.file,
    language: args.language,
    maxMatches: args.maxMatches,
    maxCases: args.maxCases
  });
}


function createCase(number) {
  return Case.create({
    number,
    lines: 100,
    status: "UNREAD"
  });
}


function createReport(args, user) {
  return new Promise(async (resolve, reject) => {
    let request = await createRequest(args);
    let report = await Report.create({
      id: generateId(),
      title: args.title,
      status: "REQUESTED",
      generated: Date.now()
    });

    await report.setUser(user);
    await user.addReport(report);
    await report.setRequest(request);

    for (let i = 0; i < 100; i++) {
      createCase(i).then(item => {
        item.setReport(report);
        report.addCase(item);

        StudentCase.create({
          student: "s4435400",
          percent: 100,
          script: "Hello"
        }).then(student => {
          student.setCase(item);
          item.addStudentCase(student);
        });

        StudentCase.create({
          student: "s4435746",
          percent: 30,
          script: "Hello World Indeed"
        }).then(student => {
          student.setCase(item);
          item.addStudentCase(student);
        });
      });
    }

    pubsub.publish(`NEW_REPORT_${user.id}`, report);
    resolve(report);
  });
}

module.exports = {
  requestReport: (root, args, context) => createReport(args, context.currentUser)
};
