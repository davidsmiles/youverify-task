import { Router } from 'express'
import { findById } from '../models/product'

const router = Router()


router.get('/:id', async (req, res) => {
    /**
     * /GET endpoint
     * Retrieve a particular Product data
     */
    try {
        const product = await findById(req.params.id)
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


export default router