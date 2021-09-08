const express = require('express')
const router = express.Router()
const Product = require('../models/Product')


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
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount
    })

    try{
        const newproduct = await product.save()
        res.json(newproduct)
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