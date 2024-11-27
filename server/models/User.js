const { sequelize, DataTypes } = require("../db");
const bcrypt = require("bcryptjs");

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

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
