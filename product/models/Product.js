const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number
})


module.exports = mongoose.model('Products', ProductSchema)