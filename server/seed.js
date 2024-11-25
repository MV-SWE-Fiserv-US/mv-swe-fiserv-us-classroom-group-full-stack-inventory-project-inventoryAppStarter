
const {sequelize} = require('./db');
const {Sauce} = require('./models');
const {Item} = require('./models/Item.js')

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
       // await Promise.all(sauces.map(sauce => Sauce.create(sauce)));

        await Item.bulkCreate(items)
  try {
    // drop and recreate tables per model definitions
    await sequelize.sync({ force: true });

    // insert data
    await Promise.all(items.map((item) => Item.create(item)));

    console.log("db populated!");
  } catch (error) {
    console.error(error);
  }
};

seed();
