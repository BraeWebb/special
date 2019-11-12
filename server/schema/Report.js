module.exports = (sequelize, DataTypes) =>
  sequelize.define('report', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('REQUESTED', 'GENERATED', 'INVESTIGATED', 'CLOSED')
    },
    generated: {
      type: DataTypes.DATE
    }
  }
);

