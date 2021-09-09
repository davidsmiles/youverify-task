const express = require('express')
const amqp = require('amqplib/callback_api')

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

        amqp.connect('amqp://localhost', (err, conn) => {
            if(err){
                throw err
            }

            conn.createChannel((err, channel) => {
                if(err) {
                    throw err
                }

                console.log('Connected to Rabbitmq successfully')

                let queueName = 'order.event.added'

                channel.assertQueue(queueName, {
                    durable: false
                })
                
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))
                console.log(`Message: ${JSON.stringify(payload)}`)

                setTimeout(() => {
                    conn.close()
                }, 1000)
            })
        })
    
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