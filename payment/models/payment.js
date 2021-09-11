const mongoose = require('mongoose')


const PaymentSchema = mongoose.Schema({
    customerId: String,
    productId: String,
    amount: Number,
    orderId: String,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Payment', PaymentSchema)
