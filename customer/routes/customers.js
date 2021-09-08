const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')


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
    const customer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const newcust = await customer.save()
        res.json(newcust)
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