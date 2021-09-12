const app = require('./app')
const mongoose = require('mongoose')
const Seed = require('./seed')

// Init Middleware
const logger = require('./middlewares/logger')
app.use(logger)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI  || "mongodb://127.0.0.1:27017/customer-service"      //  you can use your oww DB URI
mongoose.connect(
    mongo_uri, () => console.log('Customer-Service DB Connected')
)

// Seed the database with Customer data
Seed()

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port: ${port}`))

