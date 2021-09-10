const express = require('express')
const router = express.Router()
const Product = require('../models/product')


router.get('/', async (req, res) => {
    /**
     * 
     */
    try{
        const products = await Product.find()
        res.json(products)
    }
    catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    /**
     * 
     */
    const {name, description, amount } = req.body
    const product = new Product({
        name,
        description,
        amount
    })

    try{
        const newproduct = await product.save()
        res.json({
            id: newproduct.id,
            name,
            description,
            amount
        })
    }
    catch(err){
        res.status(400).json({message: err})
    }
})

/**
 * TODO('Not Implemented)
 */

router.put('/', () => {})
router.delete('/', () => {})

module.exports = router