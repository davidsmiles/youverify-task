const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Customer = require('../models/customer')


describe('POST /customers', () => {
    /**
     * testing /GET endpoints on Customer resource
     */

    const customer = {
        name: "David",
        email: "email@email.com",
        password: "password"
    }
    
    it("should save user to database", async () => {
        const response = await request(app).post('/customers').send(customer)

        expect(response.body.id).toBeTruthy()
        expect(response.body.name).toBeTruthy()
    })

    it("should have valid data", async () => {
        await request(app).post('/customers').send(customer)

        const _customer = await Customer.findOne({ email: customer.email });
        expect(_customer.name).toBe(customer.name)
        expect(_customer.email).toBe(customer.email)
    })

    it('should respond with a 200 status code', async () => {
        const response = await request(app).post('/customers').send(customer)
        
        expect(response.statusCode).toEqual(200)
    })

    it('should return 400 if request is sent twice', async () => {
        await request(app).post('/customers').send(customer)
        const response = await request(app).post('/customers').send(customer)

        expect(response.statusCode).toEqual(400)
    })

})
