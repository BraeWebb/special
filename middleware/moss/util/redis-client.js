let redis = require("redis");

const REDIS_SERVER = {
  host: process.env.REDIS_SERVER ? process.env.REDIS_SERVER : "localhost",
  port: process.env.REDIS_PORT ? process.env.REDIS_PORT : "6379"
};

function createClient(redisServer = REDIS_SERVER) {
  return redis.createClient(redisServer);
}

module.exports = {
  createClient: createClient
};
