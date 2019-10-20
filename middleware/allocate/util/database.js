let {GraphQLClient} = require('graphql-request');

let server = process.env.GRAPHQL_SERVER ? process.env.GRAPHQL_SERVER : "localhost";
let port = process.env.GRAPHQL_PORT ? process.env.GRAPHQL_PORT : "5000";
let address = server + ":" + port;
let endpoint = "http://" + address + "/graphql";

console.log("Connecting to GraphQL on " + address);
const client = new GraphQLClient(endpoint, { headers: {} });

module.exports = client;
