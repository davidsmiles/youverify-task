const express = require('express')
const router = express.Router()
const Product = require('../models/product')


router.get('/:id', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieve a particular Product data
     */
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    }
    catch (err){
        res.json({message: err})
    }
})

/**
 * TODO('Not Implemented')
 */
router.put('/:id', () => {})
router.delete('/:id', () => {})


module.exports = router