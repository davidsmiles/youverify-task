const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Order = require('../models/order')


describe('GET /orders', () => {
    
    /**
     * testing /GET endpoints on Orders resource
     */
    
    it("should return a list", async () => {
        const response = await request(app).get('/orders')
        expect(response.body).toEqual(expect.arrayContaining([]))
    })

    it("should check that data is valid", async () => {
        const order = {
            customerId: "15261762",
            productId: "893848",
            amount: 120000
        }
        const data = await new Order(order).save()

        expect(data.customerId).toBe(order.customerId)
    })

    it("should retrieve orders filtered by customerId", async () => {
        const _data = new Order({
            customerId: "15261762",
            productId: "893848",
            amount: 120000
        })
        const data = await _data.save()
        const response = await request(app).get(`/orders/${data.id}`)

        expect(response.body).toEqual(expect.arrayContaining([]))
    })
})
