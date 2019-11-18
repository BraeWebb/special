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
      return payload;
    }
  }
};
