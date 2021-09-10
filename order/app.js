const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middlewares/logger')
require('dotenv').config()

const app = express()

// Init Middleware
app.use(logger)

// Init Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Import Routes
const order = require('./routes/order')

// Initialize Routes
app.use('/order', order)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI | 'mongodb://127.0.0.1:27017/order-service'
mongoose.connect(
    mongo_uri, 
    () => console.log('Order-Service DB Connected')
)

const port = process.env.PORT || 3000
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)

