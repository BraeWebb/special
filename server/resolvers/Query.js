module.exports = {
  Query: {
    me: (root, args, context) => context.currentUser,
  }
};
