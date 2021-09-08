const express = require('express')
const router = express.Router()
const Order = require('../models/Order')


router.post('/', async (req, res) => {
    const payload = {
        customerId: req.body.customerId,
        productId: req.body.productId,
        amount: req.body.amount
    }
    const order = new Order(payload)

    try{
        const neworder = await order.save()

        // send data to Payment service


        res.json(neworder)
    }
    catch(err){
        res.status(400).json({message: err})
    }
})

/**
 * TODO('Not Implemented')
 */
router.get('/', () => {})
router.put('/', () => {})
router.delete('/', () => {})


module.exports = router