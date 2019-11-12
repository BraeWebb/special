const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_LENGTH = 8;

/// https://www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/
function generate() {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return id;
}

module.exports = generate;
