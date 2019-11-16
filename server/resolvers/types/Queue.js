module.exports = {
  QueuePage: {
    id: page => page.id,
    owner: page => page.getUser(),
    queues: page => page.getQueues()
  },
  QueueConfig: {
    signedOn: request => request.signedOn,
    questionsAsked: request => request.questionsAsked,
    waitTime: request => request.waitTime,
    autoClear: request => request.autoClear
  },
  Queue: {
    id: queue => queue.id,
    title: queue => queue.title,
    description: queue => queue.description,
    page: queue => queue.getPage(),
    config: queue => queue.getConfig(),
    waiting: queue => []
  }
};
