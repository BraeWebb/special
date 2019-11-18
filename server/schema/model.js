const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize("postgres://postgres:bVawU6etXvWwQgsR@localhost:5432/special", {
  logging: false
});

/**
 * Integrity system related data
 */
const ReportRequest = require("../schema/ReportRequest")(db, DataTypes);
const Report = require("../schema/Report")(db, DataTypes);
const User = require("../schema/User")(db, DataTypes);

const Case = require("../schema/Case")(db, DataTypes);
const StudentCase = require("../schema/StudentCase")(db, DataTypes);

Report.hasOne(ReportRequest, {as: "Request"});

User.hasMany(Report, {as: "Reports", constraints: false});
Report.belongsTo(User, {as: "User", constraints: false});

Report.hasMany(Case, {as: "Cases", constraints: false});
Case.belongsTo(Report);

Case.hasMany(StudentCase, {as: "StudentCases", constraints: false});
StudentCase.belongsTo(Case);

/**
 * Queue system related data
 */
const QueuePage = require("../schema/QueuePage")(db, DataTypes);
const QueueConfig = require("../schema/QueueConfig")(db, DataTypes);
const Queue = require("../schema/Queue")(db, DataTypes);
const Waiting = require("../schema/Waiting")(db, DataTypes);

User.hasMany(QueuePage, {as: "QueuePages"});
QueuePage.belongsTo(User, {as: "User"});

QueuePage.hasMany(Queue, {as: "Queues"});
Queue.belongsTo(QueuePage, {as: "Page"});

Queue.hasOne(QueueConfig, {as: "Config"});

Queue.hasMany(User, {as: "Admin", constraints: false});

Queue.hasMany(Waiting, {as: "Waiting"});
Waiting.belongsTo(User, {as: "User"});

/* Queue pages a user has joined to prevent multiple queues being joined */
User.hasMany(QueuePage, {as: "Joined"});

db.sync();

module.exports = {
  User,

  Case,
  StudentCase,
  ReportRequest,
  Report,

  QueuePage,
  QueueConfig,
  Queue,
  Waiting
};
