const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})


module.exports = mongoose.model('Customers', CustomerSchema)