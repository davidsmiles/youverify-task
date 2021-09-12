const request = require('supertest')
const app = require('../app')

// Setup a Test Database
const { setupDB } = require('./test-setup')
setupDB('endpoint-testing')


describe('GET /payment', () => {
    
    /**
     * testing /GET endpoints on Payments resource
     * 
     * !! test will fail if there's a rabbitmq connection problem
     */
    
    it("should return a list", async () => {
        const response = await request(app).get('/payments')
        expect(response.body).toEqual(expect.arrayContaining([]))
    })

})
