const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Customers', CustomerSchema)