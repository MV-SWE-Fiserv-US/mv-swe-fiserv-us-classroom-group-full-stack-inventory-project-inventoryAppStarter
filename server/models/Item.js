const { sequelize, DataTypes } = require("../db");

const Item = sequelize.define("items", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
});

module.exports = Item;
