const express = require('express')
require('dotenv').config()

const app = express()

// Init Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Import Routes
const order = require('./routes/order')

// Initialize Routes
app.use('/orders', order)


module.exports = app
