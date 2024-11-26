// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const { expect, beforeAll} = require('@jest/globals');
const request = require("supertest");
const app = require('./server/app');

const { User,Item } = require('./server/models/index');
const seed = require('./server/seed');
let restQuantity;

beforeAll(async() =>{
    await seed();
    const item = await Item.findAll({});
    const user = await User.findAll({});
    restQuantity  = item.length
});
//test api/items Route
test("should return 200 on Get '/api/items'" , async()=>{
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toEqual(200);
});
test("should return all Items" , async()=>{
    const response = await request(app).get('/api/items');
    expect(response.body[1].name).toBe('Mens Casual Premium Slim Fit T-Shirts ');
});
test("should return correct number of items" , async()=>{
    const response = await request(app).get('/api/items');
    expect(response.body.length).toEqual(restQuantity);
});
test("should return correct items data", async () => {
    const response = await request(app).get('/api/items');
    expect(response.body).toContainEqual(
        expect.objectContaining({
            name:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        })
    );
});
test("should return the specific item" , async()=>{
    const response = await request(app).get('/api/items/1');
    expect(response.body).toEqual(
        expect.objectContaining({
            name:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        })
    )
});
test("Test the post Route", async () => {
    let currentResponse = await request(app).get('/api/items');
    const restQuantity = currentResponse.body.length;
    const addResponse = await request(app)
        .post("/api/items")
        .send({name:"Mac Book",
            price:500.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"});
    console.log(addResponse.body);
    const newResponse = await request(app).get('/api/items');
    expect(newResponse.body.length).toEqual(restQuantity + 1);
});
test("should update the first item" , async()=>{
    await request(app)
    .put("/api/items/1")
    .send({name:"Mac Book",
        price:500.95,
        description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category:"men's clothing",
        image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"});
    const item = await Item.findByPk(1);
    expect(item.name).toEqual("Mac Book");
});
test("should delete first item array in DB" , async()=>{
    await request(app).delete("/api/items/1")
    const items = await Item.findAll({});
    expect(items.length).toEqual(restQuantity);
    expect(items[0].id).not.toEqual(1)
});
//Tests for user route
test("should return 200 on Get '/api/users'" , async()=>{
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toEqual(200);
});
test("should return all users" , async()=>{
    const response = await request(app).get('/api/users');
    expect(response.body[0].name).toBe('John Doe');
});
test("should return the specific user" , async()=>{
    const response = await request(app).get('/api/users/1');
    expect(response.body).toEqual(
        expect.objectContaining({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "$2a$12$KIXG79ZKkmuQDP9fFkxzOeh1jklZ2pyrLprKvQk.bxYr1pQsbmjCq" 
        })
    )
});


