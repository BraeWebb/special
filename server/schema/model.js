const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize("postgres://postgres:bVawU6etXvWwQgsR@localhost:5432/special");

const Case = require("../schema/Case")(db, DataTypes);
const ReportRequest = require("../schema/ReportRequest")(db, DataTypes);
const Report = require("../schema/Report")(db, DataTypes);
const User = require("../schema/User")(db, DataTypes);

Report.hasOne(ReportRequest, {as: "Request"});
// ReportRequest.belongsTo(Report);

User.hasMany(Report, {as: "Reports", constraints: false});
Report.hasOne(User);

Report.hasMany(Case, {as: "Cases", constraints: false});
Case.belongsTo(Report);

db.sync({force: true});

module.exports = {
  Case,
  ReportRequest,
  Report,
  User
};
