const gql = require('graphql-tag');

const typeDefs = gql`
  scalar Script
  scalar Time

  type Resource {
    group: String!
    identifier: String!
  }

  type User {
    id: String!
    name: String!
    type: String
    email: String
    groups: String
    resources: [Resource!]!
  }
  
  type Language {
    id: String!
    name: String!
    extensions: [String!]!
  }
  
  enum ReportStatus {
    REQUESTED
    GENERATED
    INVESTIGATED
    CLOSED
  }
  
  type ReportRequest {
    file: String!
    language: Language!
    maxMatches: Int
    maxCases: Int
    url: String
  }
  
  type Report {
    id: ID!
    title: String!
    cases: [Case]
    status: ReportStatus
    request: ReportRequest!
    generator: User!
    generated: Time!
  }
  
  type CodeBlock {
    start: Int!
    end: Int!
  }
  
  type Match {
    block1: CodeBlock!
    block2: CodeBlock!
    colour: String!
  }
  
  type StudentCase {
    id: String!
    percent: Int!
    script: Script
  }
  
  type Comment {
    id: ID!
    case: Case!
    poster: User!
    content: String!
    time: Time!
    line: Int
    replies: [Comment]!
  }
  
  enum CaseStatus {
    UNREAD
    OPEN
    CLOSED
  }
  
  type Case {
    number: Int!
    report: Report!
    student1: StudentCase!
    student2: StudentCase!
    lines: Int!
    matches: [Match!]!
    comments: [Comment!]!
    status: CaseStatus
  }
  
  type Query {
    me: User
    user(id: String!): User
    reports(status: ReportStatus): [Report]!
    report(id: String!): Report!
    cases(status: CaseStatus): [Case]!
    case(report: String!, id: Int!): Case!
    languages: [Language!]!
  }
  
  type Mutation {
    requestReport(title: String!, file: String!, language: String!, maxMatches: Int, maxCases: Int): Report!
    comment(report: String!, case: Int!, content: String!, line: Int, parent: ID): Comment!
  }
`;

module.exports = typeDefs;
