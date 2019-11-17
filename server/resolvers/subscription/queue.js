const { QueuePage } = require('../../schema/model');

const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

module.exports = {
  queue: {
    subscribe: (root, args, context) => pubsub.asyncIterator(`UPDATE-QUEUE-${args.page}`),
    resolve: async (payload) => {
      return QueuePage.findOne({
        where: {
          id: payload.queue.id
        }
      });
    }
  }
};
