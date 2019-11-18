let client = require("../util/database");

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
const getAllReportsQuery = `
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
const getReportsQuery = `
query getReports($userId: String!) {
  allReports (condition: {
    generator: $userId
  }) {
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
        id,
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
const getCaseQuery = `
query getCase($report: String!, $case: Int!){
  caseByIdAndReport(id: $case, report: $report) {
    student1,
    student2,
    student1Percent,
    student2Percent,
  }
}`;
const getScriptQuery = `
query getScript($student: String!, $report: String!){
  reportById(id: $report) {
    scriptsByReport(condition: {
      student: $student
    }) {
      nodes {
        content
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
      name: $name
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
      client.request(getReportsQuery, {userId: user}).then((data) => {
        connection.emit('reports', data["allReports"]["nodes"]);
      });
    });

    relay("report", io, socket, (connection, data) => {
      client.request(getReportQuery, {id: data["id"]}).then((data) => {
        connection.emit('report', data["reportById"]);
      });
    });

    relay("user", io, socket, (connection, data) => {
      client.request(getUserQuery, {id: user}).then((data) => {
        connection.emit('user', data["userById"]);
      });
    });

    relay("case", io, socket, (connection, data) => {
      let request = data;
      client.request(getCaseQuery, {report: request['report'], case: parseInt(request['case'])})
        .then((data) => {
          let students = data["caseByIdAndReport"];
          client.request(getScriptQuery, {report: request['report'], student: students['student1']})
            .then((data) => {
              let student1 = data["reportById"]["scriptsByReport"]["nodes"][0];
              client.request(getScriptQuery, {report: request['report'], student: students['student2']})
                .then((data) => {
                  let student2 = data["reportById"]["scriptsByReport"]["nodes"][0];
                  connection.emit('case', [students, student1, student2]);
                });
            });
        });
    });
  });
}

module.exports = bind;
