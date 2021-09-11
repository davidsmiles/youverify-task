import { Schema, model } from 'mongoose'


const OrderSchema = Schema({
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


export default model('Order', OrderSchema)
