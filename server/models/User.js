const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const { name } = require('./Item');

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,    
});

module.exports = User;