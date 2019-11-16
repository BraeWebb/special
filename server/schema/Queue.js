module.exports = (sequelize, DataTypes) =>
  sequelize.define('queue', {
      id: {
        type: DataTypes.STRING,
        allowsNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowsNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    }
  );
