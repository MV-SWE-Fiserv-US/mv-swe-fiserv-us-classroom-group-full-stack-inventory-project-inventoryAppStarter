const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const { name } = require('./Item');

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING, 
});

module.exports = User;