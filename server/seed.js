const { items, users, orders } = require("./seedData.js");

const { sequelize } = require("./db");
const { Item, User, Order } = require("./models");

const seed = async () => {
  try {
    // drop and recreate tables per model definitions
    await sequelize.sync({ force: true });

    // insert data
    const item = await Promise.all(items.map((item) => Item.create(item)));
    await Promise.all(users.map((user) => User.create(user)));
    const order = await Promise.all(orders.map((order) => Order.create(order)));

    order[0].addItems([item[0], item[1]]);
    order[1].addItems([item[6], item[8]]);
    order[2].addItems([item[11]]);

    console.log("db populated!");
  } catch (error) {
    console.error(error);
  }
};

seed();
