function bind(io) {
  return io.on('connection', (socket) => {
    socket.queues = [];
    socket.queue = {};

    socket.on('join', (data) => {
      let queue = data["queue"];
      let user = data["user"];

      if (socket.queues.indexOf(queue) === -1) {
        socket.queue[queue] = {};
        socket.queues.push(queue);
      }

      socket.queue[queue][user["id"]] = data["user"];

      io.emit('update', {'waiting': socket.queue[queue], 'queue': queue});
    });

    socket.on('leave', (data) => {
      let queue = data["queue"];
      let user = data["user"];

      console.log(socket.queue[queue][user["id"]]);
      delete socket.queue[queue][user["id"]];
      console.log(socket.queue[queue][user["id"]]);

      io.emit('update', {'waiting': socket.queue[queue], 'queue': queue});
    });
  });
}


module.exports = bind;
