const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize("postgres://postgres:bVawU6etXvWwQgsR@localhost:5432/special", {
  logging: false
});

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

db.sync({force: true});

module.exports = {
  Case,
  StudentCase,
  ReportRequest,
  Report,
  User
};
