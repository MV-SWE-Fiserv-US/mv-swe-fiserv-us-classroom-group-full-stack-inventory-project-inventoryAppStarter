const { sequelize, DataTypes } = require("../db");

const User = sequelize.define("users", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  cart: DataTypes.JSON,
  isAdmin: DataTypes.BOOLEAN,
});

module.exports = User;
