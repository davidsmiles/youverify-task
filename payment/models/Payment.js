const mongoose = require('mongoose')


const PaymentSchema = mongoose.Schema({
    customerId: String,
    productId: String,
    amount: Number,
    orderId: String
})


module.exports = mongoose.model('Payment', PaymentSchema)
