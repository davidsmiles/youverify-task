const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Order = require('../models/order')


describe('POST /order', () => {
    /**
     * testing /GET endpoints on Order resource
     * 
     * !! establish connection with rabbitmq server
     */

    const order = {
        productId: "123j34i3993",
        customerId: "8239803hd0h",
        amount: "120000"
    }
    
    it("should save order to database", async () => {
        const response = await request(app).post('/order').send(order)

        expect(response.statusCode).toBe(200)
        expect(response.body.orderId).toBeTruthy()
    })

})
