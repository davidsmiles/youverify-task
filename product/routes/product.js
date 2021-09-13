const express = require('express')
const Product = require('../models/product')

const router = express.Router()


router.get('/:id', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieve a particular Product data
     */
    try {
        const product = await Product
                                .findById(req.params.id)
                                .select('-__v')
                                .exec()
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