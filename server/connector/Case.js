const { Report, Case, StudentCase } = require("../schema/model");

async function createCase(data) {
  let report = await Report.findOne({
    where: {
      id: data.report
    }
  });

  Case.create({
    number: data.number,
    lines: data.lines,
    status: "UNREAD"
  }).then(
    item => {
      item.setReport(report);
      report.addCase(item);

      StudentCase.create({
        student: data.student1.id,
        percent: data.student1.percent,
        script: ""
      }).then(student => {
        item.addStudentCase(student);

        StudentCase.create({
          student: data.student2.id,
          percent: data.student2.percent,
          script: ""
        }).then(student => {
          item.addStudentCase(student);
        });
      });
    }
  )
}

async function addScript(data) {
  let report = await Report.findOne({
    where: {
      id: data.report
    }
  });

  let dbCase = await report.getCases({
    where: {
      number: data.id
    }
  });

  let studentCases = await dbCase[0].getStudentCases();

  studentCases[0].update({
    script: data.case[1][0]
  });
  studentCases[1].update({
    script: data.case[1][1]
  });
}

module.exports = {
  Case: {
    create: createCase,
    addScript: addScript
  }
};
