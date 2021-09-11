import { Router } from 'express'
import { findById } from '../models/customer'

const router = Router()


router.get('/:id', async (req, res) => {
    try {
        const customer = await findById(req.params.id)
        res.json(customer)
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


export default router