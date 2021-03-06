const { Queue, QueuePage } = require("../../schema/model");

function getQueuePage(id) {
  return QueuePage.findOne({
    where: {
      id: id
    }
  })
}

function getQueuePages(user) {
  return user.getQueuePages();
}

function getQueue(id) {
  return Queue.findOne({
    where: {
      id: id
    }
  })
}

module.exports = {
  queue: (root, args, context) => getQueue(args.id),
  queuePage: (root, args, context) => getQueuePage(args.id),
  queuePages: (root, args, context) => getQueuePages(context.currentUser),
};
