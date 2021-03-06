const express = require('express')
const Product = require('../models/product')

const router = express.Router()


router.get('/', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieves all Products
     */
    try{
        const products = await Product
                                .find()
                                .select('-__v')
                                .exec()
        res.json(products)
    }
    catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    /**
     * /POST endpoint
     * Add a new Product
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