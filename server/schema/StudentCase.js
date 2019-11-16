module.exports = (sequelize, DataTypes) =>
  sequelize.define('studentCase', {
      student: {
        type: DataTypes.STRING,
        allowsNull: false
      },
      percent: {
        type: DataTypes.INTEGER,
      },
      script: {
        type: DataTypes.STRING
      }
    }
  );

