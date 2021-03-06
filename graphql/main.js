let { ApolloServer } = require('apollo-server');
let gql = require('graphql-tag');
let { ql } = require('./auth.js');

const typeDefs = gql`
  type Query {
     me: User
  }
  type User {
     id: String!
     name: String!
     email: String,
     type: String,
     groups: [String],
     firstname: String,
     lastname: String
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
  },
  User: {
    id: user => user.user,
    name: user => user.name,
    email: user => user.email,
    type: user => user.type,
    groups: user => user.groups,
    firstname: user => user.firstname,
    lastname: user => user.lastname,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  credentials: 'include',
  context: ({ req }) => {
    let currentUser = null;

    try {
      ql(req, () => {
        currentUser = req.user;
        console.log(currentUser);
      });

    } catch (e) {
      console.warn(`Unable to authenticate using cookies: ${JSON.stringify(req.cookies)}`);
    }

    return {
      currentUser,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
