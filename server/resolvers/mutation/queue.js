const generateId = require("../../util/id");

const { QueuePage, QueueConfig, Queue, Waiting, User } = require("../../schema/model");

const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

async function createQueuePage(args, user) {
  let page = await QueuePage.create({
    id: generateId(),
    title: args.title
  });

  await user.addQueuePage(page);
  await page.setUser(user);

  return page;
}

function createDefaultConfig() {
  return QueueConfig.create({
    signedOn: 0,
    questionsAsked: 0,
    waitTime: 0,
    autoClear: false
  })
}

async function createQueue(args) {
  let page = await QueuePage.findOne({
    where: {
      id: args.page
    }
  });

  let queue = await Queue.create({
    id: generateId(),
    title: args.title,
    description: args.description
  });

  await queue.setPage(page);
  await page.addQueue(queue);
  await queue.setConfig(await createDefaultConfig());

  return queue;
}

async function join(args, user) {
  let queue = await Queue.findOne({
    where: {
      id: args.id
    }
  });
  let page = await queue.getPage();

  let pages = await user.getJoined({
    where: {
      id: page.id
    }
  });

  if (pages.length > 0) {
    return false;
  }

  let waiting = await Waiting.create({
    time: Date.now(),
  });
  await waiting.setUser(user);
  await queue.addWaiting(waiting);
  await user.addJoined(page);

  pubsub.publish(`UPDATE-QUEUE-${page.id}`, {
    queue: page,
    action: "JOIN",
    user: user
  });

  return true;
}

async function leave(args, user) {
  let destroyed = await Waiting.destroy({
    where: {
      queueId: args.id,
      UserId: user.id
    }
  });

  if (!destroyed) {
    return false;
  }

  let queue = await Queue.findOne({
    where: {
      id: args.id
    }
  });
  let page = await queue.getPage();

  await user.removeJoined(page);

  pubsub.publish(`UPDATE-QUEUE-${page.id}`, {
    queue: page,
    action: "LEAVE",
    user: user
  });

  return true;
}

async function kick(args, user) {
  let queue = await Queue.findOne({
    where: {
      id: args.queue
    }
  });

  if (!(await queue.hasAdmin(user))) {
    return false;
  }

  let destroyed = await Waiting.destroy({
    where: {
      queueId: args.queue,
      UserId: args.user
    }
  });

  if (!destroyed) {
    return false;
  }

  let page = await queue.getPage();
  await user.removeJoined(page);

  pubsub.publish(`UPDATE-QUEUE-${page.id}`, {
    queue: page,
    action: "KICK",
    user: user
  });

  return true;
}

async function addAdmin(args, user) {
  let queue = await Queue.findOne({
    where: {
      id: args.queue
    }
  });

  let dbUser = await User.findOne({
    where: {
      id: args.user
    }
  });

  queue.addAdmin(dbUser);
}

async function removeAdmin(args, user) {
  let queue = await Queue.findOne({
    where: {
      id: args.queue
    }
  });

  let dbUser = await User.findOne({
    where: {
      id: args.user
    }
  });

  queue.removeAdmin(dbUser);
}

async function configQueue(args, user) {
  let queue = await Queue.findOne({
    where: {
      id: args.id
    }
  });

  if (args.title !== undefined) {
    queue.update({
      title: args.title
    });
  }

  if (args.description !== undefined) {
    queue.update({
      description: args.description
    });
  }

  let config = await queue.getConfig();

  if (args.signedOn !== undefined) {
    config.update({
      signedOn: args.signedOn
    });
  }

  if (args.questionsAsked !== undefined) {
    config.update({
      questionsAsked: args.questionsAsked
    });
  }

  if (args.waitTime !== undefined) {
    config.update({
      waitTime: args.waitTime
    });
  }

  if (args.autoClear !== undefined) {
    config.update({
      autoClear: args.autoClear
    });
  }
}

module.exports = {
  joinQueue: (root, args, context) => join(args, context.currentUser),
  leaveQueue: (root, args, context) => leave(args, context.currentUser),
  kickQueue: (root, args, context) => kick(args, context.currentUser),

  newQueuePage: (root, args, context) => createQueuePage(args, context.currentUser),
  newQueue: (root, args, context) => createQueue(args),
  configureQueue: (root, args, context) => configQueue(args, context.currentUser),


  addAdmin: (root, args, context) => addAdmin(args, context.currentUser),
  removeAdmin: (root, args, context) => removeAdmin(args, context.currentUser)
};
