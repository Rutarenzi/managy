const { validateJwt } = require('./jwt.validator')
const { checkAdmin } = require('./checkadmin.middleware')

module.exports = {
    validateJwt,
    checkAdmin
}