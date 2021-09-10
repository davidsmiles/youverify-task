const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')


router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.json(customer)
    }
    catch (err){
        res.json({message: err})
    }
})

/**
 * TODO('Not Implemented')
 */
router.put('/', () => {})
router.delete('/', () => {})


module.exports = router