module.exports = {
  QueuePage: {
    id: page => page.id,
    title: page => page.title,
    owner: page => page.getUser(),
    queues: page => page.getQueues({order: ['createdAt']})
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
    waiting: queue => queue.getWaiting(),
    admins: queue => queue.getAdmin()
  },
  Waiting: {
    joined: waiting => waiting.time,
    user: waiting => waiting.getUser()
  }
};
