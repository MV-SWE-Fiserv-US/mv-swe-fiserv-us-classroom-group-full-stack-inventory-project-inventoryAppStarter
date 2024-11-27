const request = require("supertest");
const { Item } = require("../server/models/Item");
const app = require("../server/app")
const { items } = require("../server/seedData");
const { sequelize } = require("../server/db");



describe("Item Routes", () => {

    // Clear the table and seed data before each test
    beforeEach(async () => {
        await Item.truncate(); // Clears all entries in the table
        try {
        
            await sequelize.sync({ force: true });
        
        
            await Item.bulkCreate(items);
        
            console.log("db populated!");
          } catch (error) {
            console.error(error);
          }
    });

    it("GET /item - should return all items", async () => {
        const response = await request(app).get("/item");
        // console.log(response.body);
        // console.log(response.json)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Check if response is an array
    })
    it("Get /item/:id - should return a specific item", async () => {
        const response = await request(app).get("/item/1");
        expect(response.status).toBe(200)
        expect(response.body.name).toEqual('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
    })
    it("Post /item - should add new item to db and return the created Item", async () => {
        const newItem = {
            name: "Cactus Jack Dunks",
            price: 1000,
            description: "The new collaboration sneaker between rap artist Travis Scott and Nike",
            category: "Footwear",
            image: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/156/181/original/585882_03.jpg.jpeg?width=750",
        }
        const response = await request(app).post("/item").send(newItem);
        const data = response.body;
        console.log(data)

        //get list after post to check if new item is added
        const listAfterNewItem = await request(app).get("/item")

        expect(response.status).toBe(201)
        expect(data.name).toBe("Cactus Jack Dunks")
        
        const itemNames = listAfterNewItem.body.map(item => item.name); 
        expect(itemNames).toContain("Cactus Jack Dunks"); 
    })

    it("Put /item/:id - should change an existing item and return the updated item", async () => {
        const updatedItem = {
            price:209.95
        }
        const response = await request(app).put("/item/1").send(updatedItem)
        const data = response.body
        console.log(data)
        expect(data.name).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
        expect(data.price).toBe(209.95)
    })

    it("Delete /item/:id - should delete an existing item and return succesful status code", async () => {

        const response = await request(app).delete("/item/1")

        //retrieve current list to double check
        const items = await request(app).get("/item")

        expect(response.status).toBe(200)

        //search for item with id=1, make sure it does not appear in list
        const itemIds = items.body.map(item => item.id); 
        expect(itemIds).not.toContain(1);
       
    })



})