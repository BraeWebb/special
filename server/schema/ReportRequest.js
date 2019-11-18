module.exports = (sequelize, DataTypes) =>
  sequelize.define('report-request', {
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    base: {
      type: DataTypes.STRING,
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

