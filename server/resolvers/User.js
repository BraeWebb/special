module.exports = {
  User: {
    id: user => user.user,
    name: user => user.name,
    email: user => user.email,
    type: user => user.type,
    groups: user => user.groups,
    resources: user => []
  }
};
