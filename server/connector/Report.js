const { Report } = require("../schema/model");

async function setUrl(data) {
  let report = await Report.findOne({
    where: {
      id: data.id
    }
  });

  let request = await report.getRequest();
  request.update({
    url: data.url
  });
}

async function setStatus(data) {
  let report = await Report.findOne({
    where: {
      id: data.id
    }
  });

  report.update({
    status: data.status
  });
}

module.exports = {
  Report: {
    setUrl: setUrl,
    setStatus: setStatus
  }
};
