const express = require('express')
const task  = require('../work_queues/send_task')  

const router = express.Router()
const Order = require('../models/Order')


router.post('/', async (req, res) => {
    var payload = {
        customerId: req.body.customerId,
        productId: req.body.productId,
        amount: req.body.amount
    }

    const order = new Order(payload)

    try{
        neworder = await order.save()
        
        payload['orderId'] = neworder._id

        // send data to Payment service
        task.Publish('payment.service', payload)
    
        res.json(payload)
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