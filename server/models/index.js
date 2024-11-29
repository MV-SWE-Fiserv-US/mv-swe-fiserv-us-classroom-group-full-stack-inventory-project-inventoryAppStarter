const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User');
const Item = require('./Item');



const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
})

Item.belongsToMany(User, {through: 'UserItem'});
User.belongsToMany(Item, {through: 'UserItem'});


module.exports = {
  db: sequelize,
  User,
  Item,
};
