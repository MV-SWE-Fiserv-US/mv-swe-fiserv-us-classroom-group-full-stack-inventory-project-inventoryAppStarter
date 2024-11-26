const { sequelize, DataTypes } = require("../db");

const User = sequelize.define("users", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  cart: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  isAdmin: DataTypes.BOOLEAN,
});

module.exports = User;
