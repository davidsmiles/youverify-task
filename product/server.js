const app = require('./app')
const mongoose = require('mongoose')
const Seed = require('./seed')

// Init Middleware
const logger = require('./middlewares/logger')
app.use(logger)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/product-service'
mongoose.connect(
    mongo_uri,  
    () => console.log('Product-Service DB Connected'))

// Seed the database with Product data
Seed()

const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Server is listening on port: ${port}`))