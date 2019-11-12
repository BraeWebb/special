module.exports = (sequelize, DataTypes) =>
  sequelize.define('report-request', {
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxMatches: {
      type: DataTypes.INTEGER
    },
    maxCases: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING
    }
  }
);

