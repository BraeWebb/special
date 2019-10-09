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
    socket.user = parseInt(user.slice(1, user.length));

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
  });
}

module.exports = bind;
