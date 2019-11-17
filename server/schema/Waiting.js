module.exports = (sequelize, DataTypes) =>
  sequelize.define('waiting', {
      time: {
        type: DataTypes.DATE
      }
    }
  );
