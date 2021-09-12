const express = require('express')
const Customer = require('../models/customer')

const router = express.Router()


router.get('/', async (req, res) => {
    /**
     * /GET endpoint
     * Gets all customer data from Database
     */
    try{
        const customers = await Customer.find()
        res.json(customers)
    }
    catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    /**
     * /POST endpoint
     * Adds a new Customer to the Database
     */
    const {email, password, name} = req.body
    
    const exists = await Customer.findOne({ email })
    try{
        if (!exists){
            const newcust = new Customer({
                name,
                email,
                password
            })
            const customer = await newcust.save()
            res.json({
                name,
                email,
                id: customer.id
            })
        }
        else {
            res.statusCode(400).json({message: 'user with email already exists'})
        }
    }
    catch(err){
        res.status(400).json({message: err})
    }
})

/**
 * TODO('Not Implemented)
 */

router.put('/', () => {})
router.delete('/', () => {})

module.exports = router