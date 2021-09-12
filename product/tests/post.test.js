const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Product = require('../models/product')


describe('POST /products', () => {
    /**
     * testing /GET endpoints on Product resource
     */

    const product = {
        name: "Product 1",
        description: "Description for Product 1",
        amount: 120000
    }
    
    it("should save product to database", async () => {
        const response = await request(app).post('/products').send(product)

        expect(response.body.id).toBeTruthy()
        expect(response.body.name).toBeTruthy()
        expect(response.body.description).toBeTruthy()
        expect(response.body.amount).toBeTruthy()
    })

    it("should have valid data", async () => {
        await request(app).post('/products').send(product)

        const _product = await Product.findOne({ email: product.name });
        expect(_product.name).toBe(product.name)
        expect(_product.description).toBe(product.description)
    })

    it('should respond with a 200 status code', async () => {
        const response = await request(app).post('/products').send(product)
        
        expect(response.statusCode).toEqual(200)
    })

})
