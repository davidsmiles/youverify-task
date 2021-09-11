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
import order from './routes/order'

// Initialize Routes
app.use('/order', order)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI        //  you can use your oww DB URI
connect(
    mongo_uri, 
    () => console.log('Order-Service DB Connected')
)

const port = process.env.PORT || 3000
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)

