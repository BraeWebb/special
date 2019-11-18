const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

module.exports = {
  log: {
    subscribe: (root, args, context) => pubsub.asyncIterator(`LOGS-${context.currentUser.id}`),
    resolve: async (payload) => {
      return payload
    }
  }
};
