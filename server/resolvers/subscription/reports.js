/*
This file is an absolute mess
 */

const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

const { Report, Case, StudentCase } = require("../../schema/model");

function createCase(number, lines) {
  return Case.create({
    number,
    lines: lines,
    status: "UNREAD"
  });
}

module.exports = {
  newReport: {
    subscribe: (root, args, context) => pubsub.asyncIterator(`NEW-${args.report}`)
  },
  newReports: {
    subscribe: (root, args, context) => pubsub.asyncIterator(`NEW_REPORT_${context.currentUser.id}`),
    resolve: async (payload) => {
      return await Report.findOne({
        where: {
          id: payload.id
        }
      })
    }
  },
  steps: {
    subscribe: async (root, args, context) => {
      // TODO: Hacky
      // don't start generating a report until subscription is made to track progress
      // isn't 'good'
      let report = await Report.findOne({
        where: {
          id: args.id
        }
      });

      pubsub.publish("report", {
        user: context.currentUser,
        report: report,
        request: await report.getRequest(),
        id: report.id
      });

      return pubsub.asyncIterator(`STEP-${args.id}`)
    },
    resolve: async (payload, args) => {
      // TODO: More hacky
      if (payload.step === "generated" || payload.step === "parsed") {
        let report = await Report.findOne({
          where: {
            id: args.id
          }
        });

        if (payload.step === "generated") {
          let request = await report.getRequest();
          request.update({
            url: payload.url
          });
        }

        if (payload.step === "parsed") {
          for (let i in payload.result) {
            let data = payload.result[i];
            createCase(data.id, data.lines).then(
              item => {
                item.setReport(report);
                report.addCase(item);

                StudentCase.create({
                  student: data.student1.id,
                  percent: data.student1.percent,
                  script: ""
                }).then(student => {
                  student.setCase(item);
                  item.addStudentCase(student);
                });

                StudentCase.create({
                  student: data.student2.id,
                  percent: data.student2.percent,
                  script: ""
                }).then(student => {
                  student.setCase(item);
                  item.addStudentCase(student);
                });
              }
            );
          }
        }
      }

      return payload;
    }
  }
};
