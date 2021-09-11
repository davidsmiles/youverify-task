import { Schema, model } from 'mongoose'


const PaymentSchema = Schema({
    customerId: String,
    productId: String,
    amount: Number,
    orderId: String,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


export default model('Payment', PaymentSchema)
