const { sequelize, DataTypes } = require("../db");

const User = sequelize.define("users", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  cart: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
