const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middlewares/logger')

const amqp = require('amqplib/callback_api')
require('dotenv').config()

const app = express()

// Init Middleware
app.use(logger)

// Init Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Import Routes
const payment = require('./routes/payment')

// Initialize Routes
//app.use('/order', order)

amqp.connect('amqp://localhost', (err, conn) => {
    if(err){
        throw err
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err
        }

        console.log('Connected to Rabbitmq successfully')

        let queueName = 'payment.service'

        channel.assertQueue(queueName, {
            durable: false
        })
        
        channel.consume(queueName, (msg) => {
            console.log(`${msg.content.toString()}`)
            channel.ack(msg)
        })

        setTimeout(() => {
            conn.close()
        }, 1000)
    })
})

// Connect To DB
mongoose.connect(process.env.DATABASE_URI, () => console.log('Connected to database successfully'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

