const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Order', OrderSchema)
