const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Customers', CustomerSchema)