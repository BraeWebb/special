module.exports = {
  Report: {
    id: report => report.id,
    title: report => report.title,
    request: report => report.getRequest(),
    generator: report => report.getUser(),
    generated: report => report.generated,
    cases: report => report.getCases()
  },
  ReportRequest: {
    file: request => request.file,
    language: request => {},
    maxMatches: request => request.maxMatches,
    maxCases: request => request.maxCases,
    url: request => request.url
  }
};
