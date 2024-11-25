const { sequelize, DataTypes } = require("../db");

const Order = sequelize.define("orders", {
  total: DataTypes.FLOAT,
  status: DataTypes.STRING,
});

module.exports = Order;
