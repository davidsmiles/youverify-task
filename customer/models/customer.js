import { Schema, model } from 'mongoose'


const CustomerSchema = Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


export default model('Customers', CustomerSchema)