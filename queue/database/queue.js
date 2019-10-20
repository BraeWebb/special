let {request, GraphQLClient} = require('graphql-request');


let server = process.env.GRAPHQL_SERVER ? process.env.GRAPHQL_SERVER : "localhost";
let port = process.env.GRAPHQL_PORT ? process.env.GRAPHQL_PORT : "5000";
let endpoint = "http://" + server + ":" + port + "/graphql";

console.log("Connecting to GraphQL on " + server);
const client = new GraphQLClient(endpoint, { headers: {} });


const queueListQuery = `
query getQueues {
  allQueues {
    nodes {
      type,
      userByAsker {
        id,
        name,
        questionsToday,
        questionsAllTime
      },
      timeJoined
    }
  }
}`;

const queueTypes = `
query getQueues {
  allQueues {
    nodes {
      type
    }
  }
}`;

const queueDetailsQuery = `
query getQueue($type: String!) {
  allQueues(condition: {type: $type}){
    nodes {
      type,
      userByAsker {
        id,
        name,
        questionsToday,
        questionsAllTime
      },
      timeJoined
    }
  }
}`;


const joinMutation = `
mutation joinQueue($asker: String!, $type: String!) {
  createQueue (input: {
    queue: {
      asker: $asker,
      type: $type
    }
  }) {
    queue {
      type: type,
      asker: asker
    }
  }
}`;

const leaveMutation = `
mutation leaveQueue($asker: String!, $type: String!) {
  deleteQueueByAskerAndType (input: { 
      asker: $asker,
      type: $type
  }) {
    deletedQueueId
  }
}`;

// TODO: Make graphql not shit?
function cleanQueue(queue) {
  let data = queue["allQueues"]["nodes"];

  let result = [];
  for (let i in data) {
    let row = data[i]["userByAsker"];
    row["joined"] = data[i]["timeJoined"];
    row["type"] = data[i]["type"];
    result.push(row);
  }

  return result;
}

function getQueues() {
  return client.request(queueTypes).then((data) => {
    // get all the types of queues
    let types = [];
    data = data["allQueues"]["nodes"];
    for (let i in data) {
      types.push(data[i]["type"]);
    }

    // unique types
    return [...new Set(types)];
  });
}

function getQueue(queue) {
  return client.request(queueDetailsQuery, {"type": queue}).then(cleanQueue);
}

function join(user, queue) {
  return client.request(joinMutation, {"asker": user, "type": queue});
}

function leave(user, queue) {
  return client.request(leaveMutation, {"asker": user, "type": queue});
}


module.exports = {
  "getQueues": getQueues,
  "getQueue": getQueue,
  "join": join,
  "leave": leave
};
