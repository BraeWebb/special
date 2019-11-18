const { User } = require("../schema/model");

function createNewUsers(user) {
  return User.findOne({
    where: {
      id: user.user
    }
  }).then(dbUser => {

    if (dbUser === null) {
      return User.create({
        id: user.user,
        name: user.name,
        type: user.type,
        email: user.email,
        groups: user.groups
      });
    }

    return dbUser;
  });
}

module.exports = {
  createNewUsers
};
