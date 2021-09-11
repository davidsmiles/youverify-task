import moment from 'moment'

const logger = (req, res, next) => {
    /**
     * The Logger middleware function helps to output more intuitive messages
     * about Requests to the console
     * @param {Object} req
     * @param {Object} res
     */
    console.log(`${moment().format()}: ${res.statusCode} /${req.method} ${req.protocol}://${req.get('HOST')}${req.originalUrl}`)
    next()
}

export default logger 