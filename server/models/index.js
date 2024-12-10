const { sequelize, DataTypes } = require("../db");
const User = require("./User");
const Order = require("./Order");
const Item = require("./Item");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: "Order Items" });
Item.belongsToMany(Order, { through: "Order Items" });

module.exports = {
    db: sequelize,
    Item,
    User,
    Order,
    DataTypes,
};
