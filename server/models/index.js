const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User');
const Item = require('./Item');

User.belongsToMany(Item, { through: 'UserItem', as: 'Items' });
Item.belongsToMany(User, { through: 'UserItem', as: 'Users' });

module.exports = {
  db: sequelize,
  User,
  Item,
};
