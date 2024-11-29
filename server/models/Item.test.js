const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { sequelize } = require('../db');
const Item = require ('./Item');
const {User} = require ('./index.js')

let item ,user1,user2

beforeAll(async() =>{
    await sequelize.sync({ force: true })
    item = await Item.create({name:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                                    price:109.95,
                                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                                    category:"men's clothing",
                                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"});
    // Create users
    user1 = await User.create({
        username: "John Doe",
        password: "$2a$12$KIXG79ZKkmuQDP9fFkxzOeh1jklZ2pyrLprKvQk.bxYr1pQsbmjCq", // Example hashed password
      });
    user2 = await User.create({
        username: "Jane Smith",
        password: "$2a$12$KIXG79ZKkmuQDP9fFkxzOeh1jklZ2pyrLprKvQk.bxYr1pQsbmjCq", // Example hashed password
      });
      await item.addUsers([user1, user2]);
});

afterAll(async () => {
    await sequelize.close()
  })

  describe('Item Model test', () => {
    it('has an id', async () => {
      expect(item).toHaveProperty('id')
    })
    it('returns the correct name ', async () => {
        expect(item.name).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
      })
    it('returns the correct price', async () => {
        expect(item.price).toBe(109.95)
    })
    it('returns the correct description ', async () => {
        expect(item.description).toBe('Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday')
      })
    it('can update an Item', async () => {
        await item.update({ name: 'Laptop' }, { where: { id: item.id } })
        expect(item.name).toBe('Laptop')
    })
    it('can delete an Item', async () => {
        const deleteCount = await Item.destroy({ where: { name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' } })
        console.log(deleteCount)
        const deleteditem = await Item.findOne({ where: { name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' } })
        expect(deleteditem).toBeNull()
    })
    it('should associate users with the item', async () => {
        // Fetch associated users
        const users = await item.getUsers(); // Get the users associated with the item
        expect(users.length).toBe(2); 
        expect(users[0] instanceof User).toBeTruthy(); 
        expect(users[1] instanceof User).toBeTruthy();
    
        // Check if usernames are correct
        expect(users[0].username).toBe("John Doe");
        expect(users[1].username).toBe("Jane Smith");
      });
    
      it('should have an item associated with users', async () => {
        const itemsForUser1 = await user1.getItems(); // Get the items associated with user1
        // Ensure that user1 has the correct item
        expect(itemsForUser1.length).toBe(1);
        expect(itemsForUser1[0].name).toBe("Laptop");
      });

  })