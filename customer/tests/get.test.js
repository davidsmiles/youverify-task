const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Customer = require('../models/customer')
const customer = {
    name: "David",
    email: "email@email.com",
    password: "password"
}

describe('GET /customers', () => {
    
    /**
     * testing /GET endpoints on Customer resource
     */

    it("should check that data is valid", async () => {
        const data = await new Customer(customer).save()

        expect(data.name).toBe(customer.name)
    })
    
    it("should return a list", async () => {
        const response = await request(app).get('/customers')
        expect(response.body).toEqual(expect.arrayContaining([]))
    })

    it("should retrieve data for a particular customer given its ID", async () => {
        const _data = new Customer(customer)
        const data = await _data.save()
        const response = await request(app).get(`/customers/${data.id}`)

        expect(response.body._id).toEqual(data.id)
    })
})
