import express, { json, urlencoded } from 'express'
import { connect } from 'mongoose'
import logger from './middlewares/logger'
require('dotenv').config()

const app = express()

// Init Middleware
app.use(logger)

// Init Body Parser
app.use(json())
app.use(urlencoded({extended: false}))

// Import Routes
import product from './routes/product'
import products from './routes/products'

// Initialize Routes
app.use('/products', product)
app.use('/products', products)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI | 'mongodb://127.0.0.1:27017/product-service'
connect(
    mongo_uri,  
    () => console.log('Product-Service DB Connected'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

