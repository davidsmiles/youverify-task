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
const customer = require('./routes/customer')
const customers = require('./routes/customers')

// Initialize Routes
app.use('/customers', customer)
app.use('/customers', customers)

// Connect To DB
mongoose.connect(
    process.env.DATABASE_URI, 
    () => console.log('Customer-Service DB Connected')
)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

