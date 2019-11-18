const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  File: {
    filename: file => file.filename,
    mimetype: file => file.mimetype,
    encoding: file => file.encoding
  },
  Upload: GraphQLUpload
};
