const express = require('express')
const task  = require('../work_queues/send')  

const router = express.Router()
const Order = require('../models/Order')



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
        task.sendToQueue('PAYMENT', data)
    
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