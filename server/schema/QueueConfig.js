module.exports = (sequelize, DataTypes) =>
  sequelize.define('queueConfig', {
    signedOn: {
      type: DataTypes.INTEGER
    },
    questionsAsked: {
      type: DataTypes.INTEGER
    },
    waitTime: {
      type: DataTypes.INTEGER
    },
    autoClear: {
      type: DataTypes.BOOLEAN
    }
  }
);
