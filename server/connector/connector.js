const redis = require("redis");

const mapping = require("./map");

function getCallback(cmd) {
  let map = mapping;
  let parts = cmd.split(".");

  let index;
  while (index = parts.shift()) {
    map = map[index];
  }

  return map;
}

function launchConnector() {
  let subscriber = redis.createClient();
  subscriber.subscribe("database");
  subscriber.on("message", function (channel, message) {
    let data = JSON.parse(message);
    let callback = getCallback(data["cmd"]);

    callback(data);
  });
}

module.exports = launchConnector;
