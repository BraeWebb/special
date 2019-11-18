module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    groups: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }
  }
);
