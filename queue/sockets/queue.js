/**
 * Socket handler for the queue message system.
 *
 * @param io An instance of socket.io listener
 */

let {join, leave} = require("../database/queue");

/**
 * Construct and return a message handler for when a client joins the queue.
 *
 * @param io A socket.io listener which is used to emit response events.
 * @param socket The socket for an individual client connection.
 */
function joinQueue(io, socket) {
  return (data) => {
    let queue = data["queue"];
    let user = socket.user;

    console.log(queue);
    console.log(user);

    if (socket.queues.indexOf(queue) === -1) {
      socket.queue[queue] = {};
      socket.queues.push(queue);
    }

    socket.queue[queue][user["id"]] = data["user"];

    io.emit('update', {'waiting': socket.queue[queue], 'queue': queue});
  };
}

/**
 * Construct and return a message handler for when a client leaves the queue.
 *
 * @param io A socket.io listener which is used to emit response events.
 * @param socket The socket for an individual client connection.
 */
function leaveQueue(io, socket) {
  return (data) => {
    let queue = data["queue"];
    let user = socket.user;

    delete socket.queue[queue][user["id"]];

    io.emit('update', {'waiting': socket.queue[queue], 'queue': queue});
  };
}

/**
 * Bind connection events to a handler which assigns appropriate event callbacks.
 *
 * @param io An instance of socket.io listener
 */
function bind(io) {
  return io.on('connection', (socket) => {
    console.log(socket.request.user);
    let user = socket.request.user.user;
    socket.user = user.slice(1, user.length);
    console.log(socket.user);
    socket.queues = [];
    socket.queue = {};

    socket.on('join', joinQueue(io, socket));
    socket.on('leave', leaveQueue(io, socket));
  });
}


module.exports = bind;
