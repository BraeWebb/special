let {request, GraphQLClient} = require('graphql-request');


let server = process.env.GRAPHQL_SERVER ? process.env.GRAPHQL_SERVER : "localhost";
let port = process.env.GRAPHQL_PORT ? process.env.GRAPHQL_PORT : "5000";
let endpoint = "http://" + server + ":" + port + "/graphql";

console.log("Connecting to GraphQL on " + server);
const client = new GraphQLClient(endpoint, { headers: {} });


const findUser = `
query getUser($id: Int!) {
  userById(id: $id) {
    id,
    name,
    questionsToday,
    questionsAllTime
  }
}`;

const addUser = `
mutation addUser($id: Int!, $name: String!) {
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
