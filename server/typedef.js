const gql = require('graphql-tag');

const typeDefs = gql`
  scalar Script
  scalar Time
  scalar Message
  scalar Upload
  scalar JSON

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
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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
  
  type QueueConfig {
    signedOn: Int!
    questionsAsked: Int!
    waitTime: Int!
    autoClear: Boolean
  }
  
  type QueuePage {
    id: String!
    title: String!
    owner: User!
    queues: [Queue!]!
  }
  
  type Waiting {
    user: User!
    joined: Time!
  }
  
  type Queue {
    id: String!
    title: String!
    description: String
    page: QueuePage
    config: QueueConfig!
    waiting: [Waiting!]!
    admins: [User!]!
    isAdmin: Boolean!
  }
  
  type Query {
    me: User
    user(id: String!): User
    
    reports(status: ReportStatus): [Report]!
    report(id: String!): Report!
    cases(report: String!, status: CaseStatus): [Case]!
    case(report: String!, id: Int!): Case
    languages: [Language!]!
    
    queue(id: String!): Queue
    queuePage(id: String!): QueuePage
    queuePages: [QueuePage!]!
  }
  
  type Mutation {
    uploadSubmissions(file: Upload!): File!
    requestReport(title: String!, file: String!, language: String!, maxMatches: Int, maxCases: Int): Report!
    comment(report: String!, case: Int!, content: String!, line: Int, parent: ID): Comment!
    
    joinQueue(id: String!): Boolean
    leaveQueue(id: String!): Boolean
    kickQueue(user: String!, queue: String!): Boolean
    
    newQueuePage(title: String!): QueuePage
    newQueue(title: String!, description: String, page: String): Queue
    configureQueue(id: String!, title: String, description: String, signedOn: Int, questionsAsked: Int, waitTime: Int, autoClear: Boolean): Queue
    
    addAdmin(queue: String!, user: String!): Boolean
    removeAdmin(queue: String!, user: String!): Boolean
  }
  
  type Subscription {
    newReport(report: String!): Message
    newReports: Report
    
    queue(page: String!): QueuePage
    
    log: String
    steps(id: String!): JSON
  }
`;

module.exports = typeDefs;
