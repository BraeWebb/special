let client = require("../database");

const getLanguagesQuery = `
query {
  allReportlanguages {
    nodes {
      value: id,
      text: title
    }
  }
}
`;
const getReportsQuery = `
query {
  allReports {
    nodes {
      id,
      title,
      url,
      request,
      userByGenerator {
        name
      }
    }
  }
}`;
const getReportQuery = `
query getReport($id: String!){
  reportById(id: $id) {
    id,
    title,
    url,
    userByGenerator {
      id,
      name
    },
    casesByReport {
      nodes {
        student1,
        student2,
        student1Percent,
        student2Percent,
        lines
      }
    }
  }
}
`;
const getUserQuery = `
query getUser($id: String!) {
  userById(id: $id) {
    id,
    name
  }
}
`;

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

function registerUser(user, data) {
  return client.request(getUserQuery, {"id": user}).then(cleanUser).then((id) => {
    if (id === null) {
      return client.request(addUser, {
        "id": user,
        "name": data["name"]
      });
    }
  });
}

function relay(command, io, socket, responder) {
  let request = "get" + command.charAt(0).toUpperCase() + command.slice(1);

  socket.on(request, function(data) {
    let connection = io.sockets.sockets[socket.id];
    if (connection === undefined) {
      return;
    }

    responder(connection, data);
  });
}


function bind(io) {
  return io.on('connection', (socket) => {
    let user = socket.request.user.user;
    socket.user = user;

    registerUser(user, socket.request.user);

    relay("languages", io, socket, (connection, data) => {
      client.request(getLanguagesQuery).then((data) => {
        connection.emit('languages', data["allReportlanguages"]["nodes"]);
      });
    });

    relay("reports", io, socket, (connection, data) => {
      client.request(getReportsQuery).then((data) => {
        connection.emit('reports', data["allReports"]["nodes"]);
      });
    });

    relay("report", io, socket, (connection, data) => {
      client.request(getReportQuery, {id: data["id"]}).then((data) => {
        connection.emit('report', data["reportById"]);
      });
    });

    relay("user", io, socket, (connection, data) => {
      console.log(user);
      client.request(getUserQuery, {id: user}).then((data) => {
        console.log(data);
        connection.emit('user', data["userById"]);
      });
    });
  });
}

module.exports = bind;
