const moment = require('moment')
const logger = (req, res, next) => {
    console.log(`${moment().format()}: ${res.statusCode} /${req.method} ${req.protocol}://${req.get('HOST')}${req.originalUrl}`)
    next()
}

module.exports = logger 