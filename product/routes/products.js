import { Router } from 'express'
import Product, { find } from '../models/product'

const router = Router()


router.get('/', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieves all Products
     */
    try{
        const products = await find()
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

export default router