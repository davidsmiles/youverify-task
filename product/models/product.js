import { Schema, model } from 'mongoose'


const ProductSchema = Schema({
    name: String,
    description: String,
    amount: Number,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


export default model('Products', ProductSchema)