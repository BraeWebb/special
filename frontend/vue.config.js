module.exports = {
  publicPath: "/public",
  pages: {
    // index: {
    //   entry: 'src/main.js',
    //   template: 'public/index.html',
    //   filename: 'index.html',
    // },

    integrity: {
      entry: 'src/integrity.js',
      template: 'public/index.html',
      filename: 'integrity/index.html',
    },

    queue: {
      entry: 'src/queue.js',
      template: 'public/index.html',
      filename: 'queue/index.html',
    }
  }
};
