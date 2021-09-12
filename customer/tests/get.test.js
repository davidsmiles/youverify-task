const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')

const Customer = require('../models/customer')


describe('GET /customers', () => {
    
    /**
     * testing /GET endpoints on Customer resource
     */
    
    it("Should return a list", async () => {
        const response = await request(app).get('/customers')
        expect(response.body).toEqual(expect.arrayContaining([]))
    })

})
