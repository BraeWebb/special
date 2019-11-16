const generateId = require("../../util/id");

const { QueuePage, QueueConfig, Queue } = require("../../schema/model");


async function createQueuePage(args, user) {
  let page = await QueuePage.create({
    id: generateId()
  });

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

  console.log(page);

  let queue = await Queue.create({
    id: generateId(),
    title: args.title,
    description: args.description
  });

  await queue.setPage(page);
  await page.addQueue(queue);
  await queue.setConfig(await createDefaultConfig());

  console.log(queue);

  return queue;
}

module.exports = {
  newQueuePage: (root, args, context) => createQueuePage(args, context.currentUser),
  newQueue: (root, args, context) => createQueue(args),
  // configureQueue: (root, args, context) => createReport(args, context.currentUser)
};
