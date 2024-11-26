const { sequelize, DataTypes } = require("../db");

const Order = sequelize.define("orders", {
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Order;
