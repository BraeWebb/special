const fs = require('fs');

module.exports = {
  languages: (root, args, context) => JSON.parse(fs.readFileSync('data/languages.json'))
};
