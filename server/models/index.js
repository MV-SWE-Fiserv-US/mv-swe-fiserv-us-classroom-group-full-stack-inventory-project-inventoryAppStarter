const { Sequelize } = require("sequelize");
const { sequelize, DataTypes } = require("../db");
const User = require("./User");
const Order = require("./Order");

const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Item = sequelize.define("items", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
});

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: "Order Items" });
Item.belongsToMany(Order, { through: "Order Items" });

module.exports = {
  db: sequelize,
  Sauce,
  Item,
  User,
  Order,
  DataTypes,
};
