const app = require('./app')
const mongoose = require('mongoose')

// Init Middleware
const logger = require('./middlewares/logger')
app.use(logger)

// Establish connection to Mongo Database
mongo_uri = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/payment-service'    //  you can use your oww DB URI
mongoose.connect(
    mongo_uri,  
    () => console.log('Payment-Service DB Connected')
)

const port = process.env.PORT || 8083
app.listen(
    port, () => console.log(`Server is listening on port: ${port}`)
)