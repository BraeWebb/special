const client = require("../util/database");

const findUser = `
query getUser($id: String!) {
  userById(id: $id) {
    id,
    name,
    questionsToday,
    questionsAllTime
  }
}`;

const addUser = `
mutation addUser($id: String!, $name: String!) {
  createUser (input: {
    user: {
      id: $id,
      name: $name,
      questionsToday: 0,
      questionsAllTime: 0
    }
  }) {
    clientMutationId
  }
}`;


function cleanUser(user) {
  return user["userById"];
}

function getUser(user) {
  return client.request(findUser, {"id": user}).then(cleanUser);
}

function registerUser(user, data) {
  return client.request(findUser, {"id": user}).then(cleanUser).then((id) => {
    if (id === null) {
      return client.request(addUser, {
        "id": user,
        "name": data["name"]
      });
    }
  });
}

module.exports = {
  "registerUser": registerUser,
  "getUser": getUser
};
