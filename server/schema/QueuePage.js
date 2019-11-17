module.exports = (sequelize, DataTypes) =>
  sequelize.define('queuePage', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowsNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowsNull: false
      }
    }
  );
