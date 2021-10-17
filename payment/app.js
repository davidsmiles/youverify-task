const express = require('express')
const amqp = require('amqplib/callback_api')

const task = require('./workers/transaction')

require('dotenv').config()

const app = express()


// Establish connection to Rabbitmq and Handle Callback
const uri = process.env.RABBITMQ_URI || "amqp://guest:guest@localhost"
amqp.connect(uri, (err, conn) => {
    if(err){
        console.log("couldnt connect to rabbitmq server, retrying..")
        process.exit(0)
    }
    
    console.log('Payment Service RabbitMq Connected')
    conn.createChannel((err, channel) => {
        const queueName = 'PAYMENT'
        channel.assertQueue(queueName, {durable: false})
        
        channel.consume(queueName, async data => {
            const payload = {customerId, productId, orderId, amount} = JSON.parse(data.content)

            console.log('Consuming PAYMENT queue...')
            console.log(`Data received from ORDER Service ${data.content}`)

            /**
             * Publishes DATA to a Rabbitmq Messaging Queue
             * implementation of the below statement is at `./workers/transaction.js`
             */
            await task.publishTransaction(channel, 'TRANSACTION', JSON.stringify(payload))
    
            channel.ack(data)
        })

        /**
         * Listens for Published Data and have worker save the Transaction details to DB
         * implementation of the below statement is at `./workers/transaction.js`
         */
        task.saveQueuedTransaction(channel, 'TRANSACTION')
    })
})


// Import Routes
const payment = require('./routes/payment')

// Initialize Routes
app.use('/payments', payment)

module.exports = app

