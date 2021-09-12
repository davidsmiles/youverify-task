const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Product = require('../models/product')


describe('GET /products', () => {
    
    /**
     * testing /GET endpoints on Customer resource
     */
    
    it("should return a list", async () => {
        const response = await request(app).get('/products')
        expect(response.body).toEqual(expect.arrayContaining([]))
    })

    it("should check that data is valid", async () => {
        const product = {
            name: "Product 1",
            description: "Description for Product 1",
            amount: 120000
        }
        const data = await new Product(product).save()

        expect(data.name).toBe(product.name)
    })

    it("should retrieve data for a particular product given its ID", async () => {
        const _data = new Product({
            name: "Product 1",
            description: "Description for Product 1",
            amount: 120000
        })
        const data = await _data.save()
        const response = await request(app).get(`/products/${data.id}`)

        expect(response.body._id).toEqual(data.id)
    })
})
