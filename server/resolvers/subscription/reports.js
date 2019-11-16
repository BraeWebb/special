const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

const { Case, StudentCase, Report, ReportRequest } = require("../../schema/model");

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
  }
};
