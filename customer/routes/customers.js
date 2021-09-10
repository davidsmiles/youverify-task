const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')


router.get('/', async (req, res) => {
    /**
     * 
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
     * 
     */
    const {email, password, name} = req.body
    
    const exists = await Customer.findOne({ email })
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
        res.status(400).json({message: err})

    }
})

/**
 * TODO('Not Implemented)
 */

router.put('/', () => {})
router.delete('/', () => {})

module.exports = router