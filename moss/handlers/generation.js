/**
 * Socket handler for the MoSS report generation middleware
 *
 * @param io An instance of socket.io listener
 */

let SocketIOFile = require('socket.io-file');
let redis = require("redis");
let path = require("path");
let client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

function generateReport(io, socket) {
  return (data) => {
    console.log(data);
    let user = socket.request.user.user;

    // TODO: Gen that bad boi
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

    socket.on('generate', generateReport(io, socket));
  });
}


module.exports = bind;
