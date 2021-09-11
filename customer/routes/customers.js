import { Router } from 'express'
import Customer, { find, findOne } from '../models/customer'

const router = Router()


router.get('/', async (req, res) => {
    /**
     * /GET endpoint
     * Gets all customer data from Database
     */
    try{
        const customers = await find()
        res.json(customers)
    }
    catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    /**
     * /POST endpoint
     * Adds a new Customer to the Database
     */
    const {email, password, name} = req.body
    
    const exists = await findOne({ email })
    if (!exists){
        const newcust = new Customer({
            name,
            email,
            password
        })
        const customer = await newcust.save()
        res.json({
            name,
            email,
            id: customer.id
        })
    }
    else {
        res.status(400).json({message: err})

    }
})

/**
 * TODO('Not Implemented)
 */

router.put('/', () => {})
router.delete('/', () => {})

export default router