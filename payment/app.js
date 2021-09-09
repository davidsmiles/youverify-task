const express = require('express')
const amqp = require('amqplib/callback_api')
const mongoose = require('mongoose')

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

    conn.createChannel((err, channel) => {
        if(err) {
            throw err
        }

        let queueName = 'PAYMENT'

        channel.assertQueue(queueName, {durable: false})
        
        channel.consume('PAYMENT', async data => {
            const {customerId, productId, orderId, amount} = JSON.parse(data.content) 
            
            console.log('Consuming PAYMENT queue')
            console.log(JSON.parse(data.content))
    
            await channel.ack(data)
        })
    })
})


const port = process.env.PORT || 3000
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)

