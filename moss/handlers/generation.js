/**
 * Socket handler for the MoSS report generation middleware
 *
 * @param io An instance of socket.io listener
 */

let SocketIOFile = require('socket.io-file');
let redis = require("redis");
let path = require("path");

let redisServer = {
  host: process.env.REDIS_SERVER ? process.env.REDIS_SERVER : "localhost",
  port: process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379"
};

let subscriber = redis.createClient(redisServer);
let publisher = redis.createClient(redisServer);

function generateReport(io, socket) {
  return (data) => {
    let user = socket.request.user.user;
    data['user'] = user;
    data['report']['path'] = __dirname + "/../uploaded/" + data['report']['reportPath'];

    let connection = io.sockets.sockets[socket.id];

    publisher.publish("report", JSON.stringify(data), function() {
      if (connection !== undefined) {
        connection.emit('queued');
      }
    });
  };
}

/**
 * Bind connection events to a handler which assigns appropriate event callbacks.
 *
 * @param io An instance of socket.io listener
 */
function bind(io) {
  subscriber.on("error", function (err) {
    console.log("Error " + err);
  });

  subscriber.psubscribe("report:*");

  return io.on('connection', (socket) => {
    let user = socket.request.user.user;
    socket.user = parseInt(user.slice(1, user.length));

    // registerUser(socket.user, socket.request.user);

    var uploader = new SocketIOFile(socket, {
      uploadDir: 'uploaded',
      chunkSize: 10240, // default is 10240(1KB)
      overwrite: true,
      rename: function(name, fileInfo) {
        let file = path.parse(name);
        let filename = file.name;
        let ext = file.ext;
        return `${user}-${filename}${ext}`;
      }
    });

    subscriber.on("pmessage", function (pattern, channel, message) {
      message = JSON.parse(message);
      if (message['user'] !== user) {
        return;
      }

      let connection = io.sockets.sockets[socket.id];
      if (connection === undefined) {
        return;
      }

      if (channel === "report:log") {
        connection.emit('log', message['msg']);
      }

      if (channel === "report:accepted") {
        connection.emit('accepted');
      }

      if (channel === "report:extracted") {
        connection.emit('extracted');
      }

      if (channel === "report:sent") {
        connection.emit('sent');
      }

      if (channel === "report:generated") {
        connection.emit('generated', message['report']);
      }
    });

    socket.on('generate', generateReport(io, socket));
  });
}


module.exports = bind;
