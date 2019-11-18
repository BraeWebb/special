const progress = require('progress-stream');
const fs = require("fs");
const Promise = require("bluebird");

const { RedisPubSub } = require('graphql-redis-subscriptions');

const pubsub = new RedisPubSub();

async function uploadSubmissions(args, user) {
  let file = await args.file;

  let progressStream = progress();

  progressStream.on("progress", function(progress) {
    pubsub.publish(`LOGS-${user.id}`, `Uploading ${file.filename}: ${progress.transferred}`);
  });

  let stream = file.createReadStream();
  let outStream = fs.createWriteStream(`uploaded/${user.id}-${file.filename}`);

  stream.pipe(progressStream).pipe(outStream);

  return new Promise(function(resolve, reject) {
    stream.on('end', () => resolve(file));
    stream.on('error', reject);
  });
}

module.exports = {
  uploadSubmissions: (root, args, context) => uploadSubmissions(args, context.currentUser)
};
