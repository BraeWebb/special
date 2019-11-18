module.exports = {
  Case: {
    number: item => item.number,
    report: item => item.getReport(),
    student1: async item => (await item.getStudentCases())[0],
    student2: async item => (await item.getStudentCases())[1],
    lines: item => item.lines,
    matches: item => [],
    comments: item => [],
    status: item => item.status
  }
};
