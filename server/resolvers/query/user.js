const { User } = require("../../schema/model");

// TODO: authenticate who can see what of others
function getUser(id, user) {
  return User.findOne({
    where: {id: id}
  });
}

module.exports = {
  me: (root, args, context) => context.currentUser,
  user: (root, args, context) => getUser(args.id, context.currentUser)
};
