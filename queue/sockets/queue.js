/**
 * Socket handler for the queue message system.
 *
 * @param io An instance of socket.io listener
 */

let {getQueue, getQueues, join, leave} = require("../database/queue");
let {registerUser} = require("../database/user");

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

    join(user, queue).then((data) => {
      io.sockets.sockets[socket.id].emit('joined', {
        'queue': queue
      });

      getQueue(queue).then((data) => {
        console.log(data);

        io.emit('update', {'waiting': data, 'queue': queue});
      });
    });
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

    leave(user, queue).then((data) => {
      io.sockets.sockets[socket.id].emit('left', {
        'queue': queue
      });

      getQueue(queue).then((data) => {
        console.log(data);

        io.emit('update', {'waiting': data, 'queue': queue});
      });
    });
  };
}

/**
 * Bind connection events to a handler which assigns appropriate event callbacks.
 *
 * @param io An instance of socket.io listener
 */
function bind(io) {
  return io.on('connection', (socket) => {
    let user = socket.request.user.user;
    socket.user = parseInt(user.slice(1, user.length));

    registerUser(socket.user, socket.request.user);

    getQueues().then((queues) => {
      queues.forEach((queue, index) => {
        getQueue(queue).then((data) => {
          io.emit('update', {'waiting': data, 'queue': queue});
        });
      });
    });

    socket.on('join', joinQueue(io, socket));
    socket.on('leave', leaveQueue(io, socket));
  });
}


module.exports = bind;
