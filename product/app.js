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
const product = require('./routes/product')
const products = require('./routes/products')

// Initialize Routes
app.use('/products', product)
app.use('/products', products)

// Connect To DB
mongoose.connect(process.env.DATABASE_URI, () => console.log('Connected to database successfully'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

