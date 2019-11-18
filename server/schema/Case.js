module.exports = (sequelize, DataTypes) =>
  sequelize.define('case', {
    number: {
      type: DataTypes.INTEGER,
      allowsNull: false
    },
    lines: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('UNREAD', 'OPEN', 'CLOSED')
    },
    time: {
      type: DataTypes.DATE
    }
  }
);

