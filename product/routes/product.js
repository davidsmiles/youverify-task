const express = require('express')
const router = express.Router()
const Product = require('../models/product')


router.get('/:id', async (req, res) => {
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
router.put('/', () => {})
router.delete('/', () => {})


module.exports = router