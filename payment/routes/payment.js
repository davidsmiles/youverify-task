const express = require('express')
const Payment = require('../models/payment')

const router = express.Router()


router.get('/', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieves all Payments
     */
    try{
        const payment = await Payment.find()
        res.json(payment)
    }
    catch(err){
        res.json({message: err})
    }
})

/**
 * TODO('Not Implemented')
 */
router.post('/', () => {})
router.put('/', () => {})
router.delete('/', () => {})


module.exports = router
