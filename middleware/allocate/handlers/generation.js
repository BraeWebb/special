/**
 * Socket handler for the allocation middleware
 *
 * @param io An instance of socket.io listener
 */

let SocketIOFile = require('socket.io-file');
let path = require("path");

let {createClient} = require("../util/redis-client");

const fs = require('fs');

let subscriber = createClient();
let publisher = createClient();


function tutorFileUpload(io, socket) {
  return (data) => {
    console.log(data.name);
    var text = fs.readFileSync("uploaded/" + data.name,'utf8');

    let connection = io.sockets.sockets[socket.id];

    connection.emit("tutorfile", text, function() {

    });
  };
}

function classFileUpload(io, socket) {
  return (data) => {
    console.log(data.name);
    var text = fs.readFileSync("uploaded/" + data.name,'utf8');

    let connection = io.sockets.sockets[socket.id];

    connection.emit("classfile", text, function() {

    });
  };
}

function allocate(io, socket) {
  return (data) => {
    let user = socket.request.user.user;
    data['user'] = user;

    let connection = io.sockets.sockets[socket.id];

    publisher.publish("allocate", JSON.stringify(data), function() {
      // Do stuff if publish is accepted
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

  subscriber.psubscribe("allocate:*");

  return io.on('connection', (socket) => {
    let user = socket.request.user.user;
    socket.user = user;

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

      if (channel === "allocate:allocated") {
        connection.emit('allocated', message);
      }
    });

    socket.on('allocate', allocate(io, socket));
    socket.on('tutorfile', tutorFileUpload(io, socket));
    socket.on('classfile', classFileUpload(io, socket));
  });
}


module.exports = bind;
