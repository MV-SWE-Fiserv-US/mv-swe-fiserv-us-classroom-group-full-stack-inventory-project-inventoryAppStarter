const {Sequelize} = require('sequelize')
const { sequelize, DataTypes } = require('../db')

const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Item = sequelize.define("items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING
})

module.exports = {
  db: sequelize,
  Sauce,
  Item
};
