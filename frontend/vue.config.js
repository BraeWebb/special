module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
    },

    integrity: {
      entry: 'src/integrity.js',
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'integrity/index.html',
    }
  }
}
