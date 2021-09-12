const express = require('express')
const logger = require('./middlewares/logger')
require('dotenv').config()

const app = express()


// Init Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Import Routes
const product = require('./routes/product')
const products = require('./routes/products')

// Initialize Routes
app.use('/products', product)
app.use('/products', products)


module.exports = app