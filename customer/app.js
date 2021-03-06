const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

// Init Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Import Routes
const customer = require('./routes/customer')
const customers = require('./routes/customers')

// Initialize Routes
app.use('/customers', customer)
app.use('/customers', customers)



module.exports = app