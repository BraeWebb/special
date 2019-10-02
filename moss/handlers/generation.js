/**
 * Socket handler for the MoSS report generation middleware
 *
 * @param io An instance of socket.io listener
 */

let SocketIOFile = require('socket.io-file');
let redis = require("redis");
let path = require("path");
let subscriber = redis.createClient();
let publisher = redis.createClient();

function generateReport(io, socket) {
  return (data) => {
    let user = socket.request.user.user;
    data['user'] = user;

    publisher.publish("report", JSON.stringify(data));
  };
}

function reportGenerated(io, socket) {
  return (data) => {
    let user = socket.request.user.user;
    data['user'] = user;

    publisher.publish("report", JSON.stringify(data));
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

  subscriber.subscribe("generated");

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

    subscriber.on("message", function (channel, message) {
      message = JSON.parse(message);
      if (message['user'] === user) {
        console.log(message);
        io.sockets.sockets[socket.id].emit('generated', message['report']);
      }
      console.log("msg " + channel + ": " + message);
    });

    socket.on('generate', generateReport(io, socket));
  });
}


module.exports = bind;
