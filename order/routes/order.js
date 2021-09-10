const express = require('express')
const task  = require('../workers/send')  

const router = express.Router()
const Order = require('../models/order')



router.post('/', async (req, res) => {
    
    /** /POST endpoint
     *  Handles the processes involving Orders of Single Products by a Customer
     */

    var { customerId, productId, amount} = req.body

    /** --- complex code here checking that ORDER is valid */

    // Create an Order object
    const order = new Order({
        customerId, productId, amount
    })

    try{
        neworder = await order.save()

        /**
         * Here,
         * `data` is prepared to be sent to the PAYMENT Service
         */
        data = {
            customerId,
            productId,
            amount,
            orderId: neworder.id
        }

        /**
         * Send data to the PAYMENT queue
         * To keep things modularized and clean..
         * The following statement is implemented on `../workers/send.js`
         */
        task.sendToQueue('PAYMENT', JSON.stringify(data))
    
        // Return data back to the CUSTOMER that makes the /order call
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