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
import customer from './routes/customer'
import customers from './routes/customers'

// Initialize Routes
app.use('/customers', customer)
app.use('/customers', customers)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI        //  you can use your oww DB URI
connect(
    mongo_uri,  
    () => console.log('Customer-Service DB Connected')
)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

