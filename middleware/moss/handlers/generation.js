/**
 * Socket handler for the MoSS report generation middleware
 *
 * @param io An instance of socket.io listener
 */

let SocketIOFile = require('socket.io-file');
let path = require("path");

let {createClient} = require("../util/redis-client");
let client = require("../util/database");
let generateID = require("../util/id");

let subscriber = createClient();
let publisher = createClient();

const newRequestMutation = `
mutation newRequest($id: String!, $title: String!,
$file: String!, $language: String!, $maxMatches:Int!,
$maxCases: Int!, $generator: String!) {
  createReportrequest (input: {
    reportrequest: {
      id: $id,
      title: $title,
      file: $file,
      language: $language,
      maxMatches: $maxMatches,
      maxCases: $maxCases,
      generator: $generator
    }
  }) {
    reportrequest {
      id
    }
  }
}`;
function logReportRequest(data, user) {
  let report = data["report"];
  client.request(newRequestMutation,
    {
      "id": data["id"],
      "title": report["title"],
      "file": report["reportPath"],
      "language": report["language"],
      "maxMatches": report["maxMatches"],
      "maxCases": report["maxCases"],
      "generator": user,
    }
  );
}
const newReportMutation = `
mutation newReport($id: String!, $title: String!,
$url: String!, $request: String!, $generator: String!) {
  createReport(input: {report: {
    id: $id,
    title: $title,
    url: $url,
    request: $request,
    generator: $generator
  }}) {
    report {
      id
    }
  }
}`;
function logReport(id, request, url, user) {
  client.request(newReportMutation,
    {
      "id": id,
      "title": request["report"]["title"],
      "url": url,
      "request": request["id"],
      "generator": user,
    }
  );
}

const newCaseMutation = `
mutation addCase($id: Int!, $report: String!,
$student1: String!, $student1Percent: Int!,
$student2: String!, $student2Percent: Int!,
$lines: Int!) {
  createCase (input: {
    case: {
      id: $id,
      report: $report,
      student1: $student1,
      student2: $student2,
      student1Percent: $student1Percent,
      student2Percent: $student2Percent,
      lines: $lines
    }
  }) {
    clientMutationId
  }
}`;
function logCase(reportId, data) {
  client.request(newCaseMutation,
    {
      "id": data["id"],
      "report": reportId,
      "student1": data["student1"]["id"],
      "student1Percent": data["student1"]["percent"],
      "student2": data["student2"]["id"],
      "student2Percent": data["student2"]["percent"],
      "lines": data["lines"],
    }
  );
}


function generateReport(io, socket) {
  return (data) => {
    let user = socket.request.user.user;
    data['id'] = generateID();
    data['user'] = user;
    data['report']['path'] = __dirname + "/../uploaded/" + data['report']['reportPath'];

    let connection = io.sockets.sockets[socket.id];

    logReportRequest(data, socket.user);
    publisher.publish("report", JSON.stringify(data), function() {
      if (connection !== undefined) {
        connection.emit('queued');
      }
    });
  };
}

/**
 * Bind connection events to a handler which assigns appropriate event callbacks.
 *
 * @param io An instance of socket.io listener
 */
function bind(io) {
  subscriber.on("error", function (err) {
    console.log("Error " + err);
  });

  subscriber.psubscribe("report:*");

  return io.on('connection', (socket) => {
    let user = socket.request.user.user;
    socket.user = user;

    // registerUser(socket.user, socket.request.user);

    var uploader = new SocketIOFile(socket, {
      uploadDir: 'uploaded',
      chunkSize: 10240, // default is 10240(1KB)
      overwrite: true,
      rename: function(name, fileInfo) {
        let file = path.parse(name);
        let filename = file.name;
        let ext = file.ext;
        return `${user}-${filename}${ext}`;
      }
    });

    subscriber.on("pmessage", function (pattern, channel, message) {
      message = JSON.parse(message);
      if (message['user'] !== user) {
        return;
      }

      let connection = io.sockets.sockets[socket.id];
      if (connection === undefined) {
        return;
      }

      if (channel === "report:log") {
        connection.emit('log', message['msg']);
      }

      if (channel === "report:accepted") {
        connection.emit('accepted');
      }

      if (channel === "report:extracted") {
        connection.emit('extracted');
      }

      if (channel === "report:sent") {
        connection.emit('sent');
      }

      if (channel === "report:generated") {
        let request = message['request'];
        logReport(request['id'], request, message['report'], socket.user);
        connection.emit('generated', message['report']);
      }

      if (channel === "report:parsed") {
        for (let i in message["cases"]) {
          logCase(message["reportId"], message["cases"][i]);
        }
        connection.emit('parsed', message["reportId"]);
      }
    });

    socket.on('generate', generateReport(io, socket));
  });
}


module.exports = bind;
