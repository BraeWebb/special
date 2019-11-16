const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const typeDefs = require("./typedef");
const auth = require("./util/auth");
const resolvers = require("./resolvers/resolvers");
const { createNewUsers } = require("./util/user");


async function main() {
  const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
  });

  const server = new ApolloServer({
    schema: schema,
    playground: true,
    introspection: true,
    credentials: 'include',
    subscriptions: {
      onConnect: async (connectionParams, webSocket) => {
        return {
          currentUser: await auth.ql(webSocket.upgradeReq).then(() => {
            return createNewUsers(webSocket.upgradeReq.user);
          })
        };
      },
    },
    context: async ({req, connection}) => {
      if (connection) {
        return {
          currentUser: connection.context.currentUser
        }
      }
      try {
        return {
          currentUser: await auth.ql(req).then(() => {
            return createNewUsers(req.user);
          })
        };
      } catch (e) {
        console.warn(e);
        console.warn(`Unable to authenticate using cookies: ${JSON.stringify(req.cookies)}`);
      }
    },
  });

  server.listen(
    {host: "0.0.0.0", port: "4000"}
  ).then(({url, subscriptionsUrl}) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });
}

main().then().catch((e) => {
  console.log(e);
});
