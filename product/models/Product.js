const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    amount: Number,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Products', ProductSchema)