const express = require('express')
const amqp = require('amqplib/callback_api')
const mongoose = require('mongoose')

const task = require('./workers/transaction')

require('dotenv').config()

const app = express()

// Connect To Database
mongoose.connect(
    process.env.DATABASE_URI, 
    () => console.log('Payment-Service DB Connected')
)


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

            await task.publishTransaction(channel, 'TRANSACTION', JSON.stringify(payload))
    
            channel.ack(data)
        })

        task.saveQueuedTransaction(channel, 'TRANSACTION')
    })
})



const port = process.env.PORT || 3000
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)

