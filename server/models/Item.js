const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');

const Item = sequelize.define('item', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.FLOAT,
    image: Sequelize.STRING,
    category: Sequelize.STRING,

});

module.exports = Item;
