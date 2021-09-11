const express = require('express')
const amqp = require('amqplib/callback_api')
const mongoose = require('mongoose')

const task = require('./workers/transaction')

require('dotenv').config()

const app = express()

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI    //  you can use your oww DB URI
mongoose.connect(
    mongo_uri,  
    () => console.log('Payment-Service DB Connected')
)

// Establish connection to Rabbitmq and Handle Callback
amqp.connect('amqp://rabbitmq', (err, conn) => {
    if(err){
        throw err
    }
    console.log('Payment Service RabbitMq Connected')
    conn.createChannel((err, channel) => {
        if(err) {
            throw err
        }

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



const port = process.env.PORT || 3000
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)

