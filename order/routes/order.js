const express = require('express')
const task  = require('../workers/send')  

const router = express.Router()
const Order = require('../models/order')



router.post('/', async (req, res) => {
    var { customerId, productId, amount} = req.body

    const order = new Order({
        customerId, productId, amount
    })

    try{
        neworder = await order.save()

        // send data to Payment service
        data = {
            customerId,
            productId,
            amount,
            orderId: neworder.id
        }
        task.sendToQueue('PAYMENT', JSON.stringify(data))
    
        res.json(data)
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