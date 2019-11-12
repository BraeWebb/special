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
    context: async ({req}) => {
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
  ).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main().then().catch((e) => {
  console.log(e);
});
