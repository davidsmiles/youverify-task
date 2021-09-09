const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
    customerId: String,
    productId: String,
    amount: Number,
    orderId: String
})


module.exports = mongoose.model('Order', OrderSchema)
